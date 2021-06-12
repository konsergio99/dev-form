import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

// interface FrameworkVersion {
//   name: string;
//   version: [string, string, string];
// }

@Component({
  selector: 'app-dev-form',
  templateUrl: './dev-form.component.html',
  styleUrls: ['./dev-form.component.css']
})
export class DevFormComponent implements OnInit {

  loginForm: FormGroup;
  developerForm = {};
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  frameworks = ['Angular', 'React', 'Vue'];
  selectedValue = '';
  versions = [];

  frameworkVersions = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3']
  };

  constructor(private formBuilder: FormBuilder) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    const formHobbies = new FormArray([]);



    this.loginForm = this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/)]
      ],
      surname: [null, [
        Validators.required,
        Validators.pattern(/^[A-z0-9]*$/)]
      ],
      birthday: [null, Validators.required],
      selectFramework: ['', Validators.required],
      selectFrameworkVersion: ['', Validators.required],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      hobbies: formHobbies,
    });

    this.onAddHobby();
  }

  // tslint:disable-next-line:typedef
  selectFramework() {
    if (this.selectedValue === 'Angular') {
      this.versions = this.frameworkVersions.angular;
    }
    if (this.selectedValue === 'React') {
      this.versions = this.frameworkVersions.react;
    }
    if (this.selectedValue === 'Vue') {
      this.versions = this.frameworkVersions.vue;
    }
    console.log(this.versions);
    console.log(this.frameworks);
  }

  // tslint:disable-next-line:typedef
  submit() {
    this.developerForm = this.loginForm.value;
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.developerForm);
    this.loginForm.reset();
  }

  // tslint:disable-next-line:typedef
  get controls() { // a getter!
    return (this.loginForm.get('hobbies') as FormArray).controls;
  }

  // tslint:disable-next-line:typedef
  onAddHobby() {
    ((this.loginForm.get('hobbies')) as FormArray).push(
      new FormGroup({
        hobby: new FormControl(null, Validators.required),
        duration: new FormControl(null, [
          Validators.required,
        ]),
      })
    );
  }

  // tslint:disable-next-line:typedef
  onDeleteHobby(index: number) {
    // tslint:disable-next-line:no-unused-expression
    (this.loginForm.get('hobbies') as FormArray).removeAt(index);
  }

}
