import type { CollectionConfig } from 'payload'
import { isAdmin, isEditorAmbiente } from '../access/isRole'

export const Ambiente: CollectionConfig = {
    slug: 'ambiente',
    admin: {
        useAsTitle: 'nombre',
        defaultColumns: ['nombre', 'categoria', 'estado'],
        group: 'Contenido',
    },
    access: {
        create: ({ req: { user } }) => {
            if (!user) return false;
            return user.role === 'admin' || user.role === 'editorAmbiente';
        },
        read: ({ req: { user } }) => {
            if (!user) return false;
            return user.role === 'admin' || user.role === 'editorAmbiente';
        },
        update: ({ req: { user } }) => {
            if (!user) return false;
            return user.role === 'admin' || user.role === 'editorAmbiente';
        },
        delete: isAdmin,
    },
    fields: [
        {
            name: 'nombre',
            type: 'text',
            required: true,
            label: 'Nombre del Ambiente',
        },
        {
            name: 'descripcion',
            type: 'textarea',
            required: true,
            label: 'Descripción',
        },
        {
            name: 'imagenes',
            type: 'array',
            label: 'Imágenes del Ambiente',
            fields: [
                {
                    name: 'imagen',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                }
            ],
            minRows: 1,
            required: true,
        },
        {
            name: 'categoria',
            type: 'select',
            options: [
                { label: 'Sala', value: 'sala' },
                { label: 'Comedor', value: 'comedor' },
                { label: 'Dormitorio', value: 'dormitorio' },
                { label: 'Cocina', value: 'cocina' },
                { label: 'Baño', value: 'baño' },
                { label: 'Oficina', value: 'oficina' },
                { label: 'Exterior', value: 'exterior' },
            ],
            required: true,
        },
        {
            name: 'estado',
            type: 'select',
            options: [
                { label: 'Publicado', value: 'publicado' },
                { label: 'Borrador', value: 'borrador' },
                { label: 'Archivado', value: 'archivado' },
            ],
            required: true,
            defaultValue: 'borrador',
        },
        {
            name: 'productos',
            type: 'relationship',
            relationTo: 'catalogo',
            hasMany: true,
            label: 'Productos incluidos',
        },
        {
            name: 'dimensiones',
            type: 'group',
            fields: [
                {
                    name: 'largo',
                    type: 'number',
                    required: true,
                    min: 0,
                    label: 'Largo',
                },
                {
                    name: 'ancho',
                    type: 'number',
                    required: true,
                    min: 0,
                    label: 'Ancho',
                },
                {
                    name: 'unidad',
                    type: 'select',
                    options: [
                        { label: 'cm', value: 'cm' },
                        { label: 'in', value: 'in' },
                        { label: 'm', value: 'm' },
                    ],
                    defaultValue: 'cm',
                    required: true,
                },
            ],
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