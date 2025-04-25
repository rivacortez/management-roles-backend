// backend/src/access/isRole.ts

import {Access} from "payload";

export const isRole = (roles: string[]): Access => {
    return ({ req: { user } }) => {
        if (!user) return false;
        if (roles.includes(user.role)) return true;
        return false;
    };
};

export const isAdmin = isRole(['admin']);
export const isEditorCatalogo = isRole(['admin', 'editorCatalogo']);
export const isEditorAmbiente = isRole(['admin', 'editorAmbiente']);

// Funciones específicas para cada tipo de acceso
export const canAccessCatalogo = ({ req: { user } }) => {
    if (!user) return false;
    return user.role === 'admin' || user.role === 'editorCatalogo';
};

export const canAccessAmbiente = ({ req: { user } }) => {
    if (!user) return false;
    return user.role === 'admin' || user.role === 'editorAmbiente';
};