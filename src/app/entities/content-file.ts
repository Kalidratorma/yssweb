/**
 * Файлы контента (фото, видео)
 */
export class ContentFile {

  /**
   * Идентификатор
   */
  id: number;

  /**
   * Имя файла с расширением без пути
   */
  name: string;

  /**
   * Оригинальное имя файла
   */
  originName: string;

  constructor(id: number, shortName: string, originName: string, name: string) {
    this.id = id;
    this.originName = originName;
    this.name = name;
  }
}
