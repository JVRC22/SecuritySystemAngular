export interface Invitacion {
    id: number;
    owner_id: number;
    invitado_id: number;
    tienda_id: number;
    fecha: string;
    user_id: string;
    codigo: string;
    invitacion_id: number;
    respuesta: boolean;
}
