import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
    const payload = await getPayload({
        config: configPromise,
    })

    const { user } = await payload.auth({
        headers: req.headers
    })

    if (!user || !['admin', 'editorCatalogo'].includes(user.role)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const products = await payload.find({
        collection: 'catalogo',
    })

    return Response.json({ products })
}