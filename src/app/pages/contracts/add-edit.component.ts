import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService, ContractService} from '../../services';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {DateUtility} from "../../utility";
import {ContractType, getContractTypeMap} from "../../entities";

@Component({templateUrl: './add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  contractTypeMap: Map<ContractType, string> = getContractTypeMap();

  expDate: NgbDateStruct = DateUtility.getNgbDateStructFromDate(new Date());

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      id: [],
      contractNumber: ['', Validators.required],
      contractorContractNumber: [''],
      contractSubject: ['', Validators.required],
      contractType: [null],
      expDate: [null],
      paymentTerms: [null]
    });

    this.title = 'Добавить договор';
    if (this.id) {
      // edit mode
      this.title = 'Редактировать договор';
      this.loading = true;
      this.contractService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          if (x.expDate) {
            let eDate = DateUtility.getNgbDateStructFromDbFormat(x.expDate);
            if (eDate) {
              this.expDate = eDate;
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
          this.alertService.success('Договор сохранен', {keepAfterRouteChange: true});
          this.router.navigateByUrl('/contracts');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private save() {

    this.form.value.expDate = DateUtility.getDbFormatFromNgbDateStruct(this.expDate);

    // create or update user based on id param
    return this.id
      ? this.contractService.update(this.form.value)
      : this.contractService.create(this.form.value);
  }
}
