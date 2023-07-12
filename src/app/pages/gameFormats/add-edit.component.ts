import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {GameFormatService, AlertService} from '../../services';
import {getIceTypeMap, IceType} from "../../entities";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  name?: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  iceTypeMap: Map<IceType, string> = getIceTypeMap();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private gameFormatService: GameFormatService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      isCommercial: [false, Validators.required],
      iceType: [IceType.HALF, Validators.required],
      numberOfPlayers: [4, Validators.required]
    });

    this.title = 'Добавить формат';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать формат';
      this.loading = true;
      this.gameFormatService.getByGameFormatId(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveGameFormat()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Формат игры сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/gameFormats');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveGameFormat() {
    // create or update user based on id param
    return this.name
      ? this.gameFormatService.update(this.form.value)
      : this.gameFormatService.create(this.form.value);
  }
}
