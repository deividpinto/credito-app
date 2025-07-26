import { Usuario } from './usuario.interface';

export interface AuthResponse {
  token: string;
  message: string;
  usuario: Usuario;
}
