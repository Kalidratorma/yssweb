import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, ParentService} from '../../services';
import {NgbDateStruct, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility";
import {PlayerDialogComponent} from "../../modals";
import {Player} from "../../entities";
import {KeyValue} from "@angular/common";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  checkedPlayers: Set<Player> = new Set<Player>();

  birthDate: NgbDateStruct = DateUtility.getNgbDateStructFromDate(new Date());

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private parentService: ParentService,
    private alertService: AlertService,
    public modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      patronymic: [''],
      birthDate: [null],
      phoneNumber: ['', Validators.required],
      sex: [null, Validators.required],
      user: [null],
      contracts: [null],
    });

    this.title = 'Добавить родителя';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать родителя';
      this.loading = true;
      this.parentService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if (x.birthDate) {
            let eDate = DateUtility.getNgbDateStructFromDbFormat(x.birthDate);
            if (eDate) {
              this.birthDate = eDate;
            }
          }
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
    this.save()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Родитель сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/parents');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {

    this.form.value.birthDate = DateUtility.getDbFormatFromNgbDateStruct(this.birthDate);

    // create or update user based on id param
    return this.id
      ? this.parentService.update(this.form.value)
      : this.parentService.create(this.form.value);
  }

  openPlayerDialog() {
    const modalRef = this.modalService.open(PlayerDialogComponent, { size: 'lg' });
    modalRef.componentInstance.inputPlayers = this.checkedPlayers;
    modalRef.result.then( value => {
      this.checkedPlayers = value;
      this.form.value.playerList = Array.from(value.values());
    })
  }

  detach(player: Player) {
    this.checkedPlayers.delete(player);
    const index = this.form.value.playerList.indexOf(player, 0);
    if (index > -1) {
      this.form.value.playerList.splice(index, 1);
    }
  }

  compareFn(a: KeyValue<number, Player>, b: KeyValue<number, Player>): number {
    let surnameA = a.value.surname.toUpperCase();
    let surnameB = b.value.surname.toUpperCase();
    let nameA = a.value.name.toUpperCase();
    let nameB = b.value.name.toUpperCase();
    let patronymicA = a.value.patronymic ? a.value.patronymic.toUpperCase() : '';
    let patronymicB = b.value.patronymic ? b.value.patronymic.toUpperCase() : '';
    let birthDateA = a.value.birthDate ? a.value.birthDate.toUpperCase() : '';
    let birthDateB = b.value.birthDate ? b.value.birthDate.toUpperCase() : '';
    return (surnameA < surnameB) ? -1 : (surnameA > surnameB) ? 1 :
      (nameA < nameB) ? -1 : (nameA > nameB) ? 1 :
        (patronymicA < patronymicB) ? -1 : (patronymicA > patronymicB) ? 1 :
          (birthDateA < birthDateB) ? -1 : (birthDateA > birthDateB) ? 1 : 0;
  }
}
