import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (req: Request) => {
    const payload = await getPayload({
        config: configPromise,
    })

    const { user } = await payload.auth({
        headers: req.headers
    })

    if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await payload.find({
        collection: 'users',
    })

    return Response.json(data)
}