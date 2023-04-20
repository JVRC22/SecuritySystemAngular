export interface User {
    id: number;
    username: string;
    correo: string;
    password: string;
    new_password: string;
    telefono: number;
    estatus: number;
    codigo_verificacion: number;
    rol_id: number;
    info_user_id: number;
    correo_o_telefono: string;
}
