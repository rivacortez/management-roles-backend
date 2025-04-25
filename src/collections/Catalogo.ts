import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorCatalogo } from '../access/isRole'

export const Catalogo: CollectionConfig = {
    slug: 'catalogo',
    admin: {
        useAsTitle: 'nombreItem',
        defaultColumns: ['nombreItem', 'precio'],
       
    },
    access: {
        create: isEditorCatalogo,
        read: isEditorCatalogo,
        update: isEditorCatalogo,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'nombreItem',
            type: 'text',
            required: true,
            label: 'Nombre del Item',
        },
        {
            name: 'precio',
            type: 'number',
            required: true,
            label: 'Precio',
            min: 0,
            admin: {
                step: 0.01,
            },
        },
        {
            name: 'creadoPor',
            type: 'relationship',
            relationTo: 'users',
            hasMany: false,
            admin: {
                readOnly: true,
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ req }) => {
                        return req.user?.id || null
                    },
                ],
            },
        },
        {
            name: 'createdAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
            hooks: {
                beforeChange: [
                    () => {
                        return new Date();
                    },
                ],
            },
        },
        {
            name: 'updatedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
            hooks: {
                beforeChange: [
                    () => {
                        return new Date();
                    },
                ],
            },
        },
    ],
}