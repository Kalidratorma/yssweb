import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileService} from "../../services";
import {finalize} from "rxjs/operators";
import {HttpEventType} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ContentFile} from "../../entities";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'upload-dialog',
  styleUrls: ['upload-component.scss'],
  templateUrl: 'upload-component.html'
})
export class UploadComponent {
  @Input() requiredFileType: string = "jpg, jpeg, png, svg, webm, ogv, mp4";
  @Input() contentFileSet: Set<ContentFile> = new Set<ContentFile>();
  @Output() savedData: EventEmitter<ContentFile[]> = new EventEmitter<ContentFile[]>;

  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();

  protected readonly environment = environment;

  constructor(public fileService: FileService) {
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (files && files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);
      }

      const upload = this.fileService.uploadFile(formData)
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(event.total ? (100 * (event.loaded / event.total)) : 1);
        } else if (event.type == HttpEventType.Response && event.body) {
          (event.body as ContentFile[]).forEach(
            cf => {
              this.initContentFileSet();
              this.contentFileSet.add(cf)
            });
          this.save();
        }
      })
    }
  }

  private save() {
    this.savedData.emit(Array.from(this.contentFileSet.values()));
  }

  private initContentFileSet() {
    if (typeof this.contentFileSet['add'] !== 'function') {
      if (Array.isArray(this.contentFileSet) && this.contentFileSet.length > 0) {
        let tempArray: ContentFile[] = this.contentFileSet;
        this.contentFileSet = new Set<ContentFile>();
        tempArray.forEach(x => this.contentFileSet.add(x));
      } else {
        this.contentFileSet = new Set<ContentFile>();
      }
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 100;
    this.uploadSub = new Subscription();
  }

  delete(contentFile: ContentFile) {
    this.initContentFileSet();
    this.contentFileSet.delete(contentFile);
    this.save();
  }
}
