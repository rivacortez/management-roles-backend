import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
    try {
        const payload = await getPayload({
            config: configPromise,
        })

        const { user } = await payload.auth({
            headers: req.headers
        })

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        return Response.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        })
    } catch (error) {
        return Response.json({ error: 'Server error' }, { status: 500 })
    }
}