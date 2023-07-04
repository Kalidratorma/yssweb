/**
 * Пользователь
 */
export interface User {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Имя пользователя
   */
  username: string;

  /**
   * Почта
   */
  email: string;

  /**
   * Признак активности учётной записи
   */
  enabled?: boolean;

  /**
   * Роль
   */
  role?: string;

  /**
   * JWT токен
   */
  token?: string;
}
