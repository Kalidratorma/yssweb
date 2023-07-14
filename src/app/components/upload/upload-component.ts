import {Component, Input} from '@angular/core';
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

  contentFileSet: Set<ContentFile> = new Set<ContentFile>();

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
            cf =>
              this.contentFileSet.add(cf)
          );
        }
      })
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
}
