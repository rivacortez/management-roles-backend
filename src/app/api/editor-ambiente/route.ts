import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function GET(req: Request) {
    const payload = await getPayload({
        config: configPromise,
    })

    const { user } = await payload.auth({
        headers: req.headers
    })

    if (!user || !['admin', 'editorAmbiente'].includes(user.role)) {
        return Response.json({ error: 'Forbidden' }, { status: 403 })
    }

    const environments = await payload.find({
        collection: 'ambiente',
    })

    return Response.json({ environments })
}