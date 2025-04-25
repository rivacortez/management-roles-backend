import { CollectionConfig, PayloadRequest } from 'payload';
import { isAdmin } from '../access/isRole';

const isAdminFieldLevel = ({ req }: { req: PayloadRequest }) => {
  return req.user?.role === 'admin';
};

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    tokenExpiration: 7200, // 2 hours
    cookies: {
      secure: process.env.NODE_ENV === 'production',
     
    },
    verify: false,
    depth: 0,
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true;
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre completo',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor Catálogo', value: 'editorCatalogo' },
        { label: 'Editor Ambiente', value: 'editorAmbiente' },
      ],
      access: {
        update: isAdminFieldLevel,
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
      name: 'lastLogin',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value) return value;
            return undefined;
          }
        ]
      },
    },
  ],
  hooks: {
    afterLogin: [
      async ({ req, user }) => {
        const { payload } = req;
        await payload.update({
          collection: 'users',
          id: user.id,
          data: {
            lastLogin: new Date().toISOString(),
          },
        });
      },
    ],
  },
};