import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
    const payload = await getPayload({
        config: configPromise,
    })

    const { user } = await payload.auth({
        headers: req.headers
    })

    if (!user || user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const users = await payload.find({
        collection: 'users',
    })

    return Response.json({ users })
}