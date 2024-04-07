import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MapComponent } from 'app/shared/components/map/map.component';
import { config } from '../../authorized/const';
import { FormMode } from 'app/shared/helpers/forms/baseFormComponent';
import { Router, RouterLink } from '@angular/router';

export enum stages {
  basicInfo = 0,
  locationInfo = 1,
  loginCredential = 2
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.sass',
  standalone: true,
  imports: [
    MapComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink]
})
export class RegistrationComponent implements OnInit {
  stagesFace = stages
  regStage: stages = stages.basicInfo
  form: FormGroup;
  config: config = {
    form: { mode: FormMode.View },
    tab: 'registration',
    map: { style: { 'height.vh': 60 }, enableSearch: true }
  };

  @ViewChild(MapComponent) map: MapComponent;

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('',Validators.email),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      phone_number: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onSubmit() {
    const payload = this.form.getRawValue();
    this.authService.signIn(payload).subscribe(
      () => this.router.navigate(['/login']),
      err => alert(err.data));
  }

  previousStage() {
    if (this.regStage > stages.basicInfo) this.regStage = this.regStage - 1;
  }

  nextStage() {
    if (this.regStage < stages.loginCredential) this.regStage = this.regStage + 1;
    if (this.regStage > stages.locationInfo) this.form.controls.address.setValue(this.map.returnSearchResult);
  }
}
