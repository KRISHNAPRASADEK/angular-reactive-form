import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  listData: any[] = [];
  gender: boolean = false;
  target: boolean = false;
  skillsSet: any = [
    { id: 1, name: 'React JS' },

    { id: 2, name: 'Node JS' },

    { id: 3, name: 'Angular JS' },
  ];

  // user form group
  userForm = this.fb.group({
    // array
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    email: ['', [Validators.email, Validators.required]],
    mobile: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*'),
      ],
    ],
    group: ['', Validators.required],
    gender: ['', Validators.required],
    skills: this.fb.array([], [Validators.required]),
  });
  selectedCheckBoxList: any = [];

  constructor(private fb: FormBuilder) {}

  controlOnChange(e: any) {
    const skills: FormArray = this.userForm.get('skills') as FormArray;

    if (e.target.checked) {
      skills.push(new FormControl(e.target.value));
      this.selectedCheckBoxList.push(e.target.value);
    } else {
      const index = skills.controls.findIndex(
        (skill) => skill.value === e.target.value
      );
      skills.removeAt(index);
    }
  }

  submitForm() {
    if (this.userForm.valid && this.userForm.value.gender != '') {
      this.listData.push(this.userForm.value);
      this.userForm.reset();
    } else {
      this.gender = true;
      alert('Invalid Inputs');
    }
    console.log(this.listData);
  }
}
