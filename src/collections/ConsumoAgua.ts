import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorAmbiente } from '../access/isRole'

export const ConsumoAgua: CollectionConfig = {
    slug: 'consumo-agua',
    admin: {
        useAsTitle: 'diaRegistro',
        defaultColumns: ['diaRegistro', 'cantidad','observaciones', 'createdAt'],
        group: 'Registros Ambientales',
    },
    access: {
        create: isEditorAmbiente,
        read: isEditorAmbiente,
        update: isEditorAmbiente,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'diaRegistro',
            type: 'date',
            required: true,
            label: 'Día de Registro',
            admin: {
                date: {
                    pickerAppearance: 'dayOnly',
                    displayFormat: 'dd/MM/yyyy',
                },
            },
        },
        {
            name: 'cantidad',
            type: 'number',
            required: true,
            label: 'Cantidad (L)',
            min: 0,
        },
        {
            name: 'observaciones',
            type: 'textarea',
            label: 'Observaciones',
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