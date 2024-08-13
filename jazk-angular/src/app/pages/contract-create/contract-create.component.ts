import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ParseService } from '../../services/parse.service';
import { UtilsService } from '../../services/utils.service';
import * as Parse from 'parse';

@Component({
  selector: 'app-contract-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contract-create.component.html',
  styleUrl: './contract-create.component.css'
})
export class ContractCreateComponent {
  contractForm!: FormGroup;
  
  data: any = {};
  docs: any = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
    private utils: UtilsService,
    private dataService: DataService,
    public parseService: ParseService
  ) {}

  ngOnInit(): void {
    this.data.lpoNumber = this.dataService.generateNumber("CO");

    let today = new Date()
    // this.data.startDate = this.utils.formatDateToYYYYMMDD(today)

    this.contractForm = this.fb.group({
      contractId: ['', Validators.required],
      name: ['', Validators.required],
      vendor: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required],
      currency: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      renewalDate: [''],
      terminationDate: [''],
      status: ['', Validators.required],
      owner: ['', Validators.required],
      parties: ['', Validators.required],
      attachments: [''],
      paymentTerms: [''],
      milestones: [''],
      governingLaw: [''],
      riskLevel: [''],
      confidentiality: [''],
      notes: [''],
      associatedContracts: ['']
    });
  }


  onSubmit(): void {
    this.parseService.submitting = true
    console.log(this.contractForm.value);
    if (this.contractForm.valid) {
      this.save();
    } else {
      console.log("Form is invalid");
      this.toastr.info('Please fill all the missing fields', 'Error')
    }
  }

  async save() {
    let e;

    let DB = Parse.Object.extend("JazzContract");
    e = new DB();

    e.set('docs', this.docs)

   
    console.log("data", e);

    let user: any = this.auth.currentUser;
    e.set("created_by_id", user.id);
    e.set("createdByPointer", user?.toPointer());
    
    let saved = await this.parseService.save(e, this.contractForm.value);
    if (saved) {
      this.toastr.success("Contract has been submitted");
      this.router.navigate(["/search"]);
    }
    this.parseService.submitting = false;
  }

  pickFile() {
    let name = Date.now().toString()
    let fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");

    fileInput.onchange = (event: any) => {
      let file = event.target.files[0];

      console.log("file", file);

      this.toastr.info("Uploading...please wait...");
      this.parseService.uploading = true;

      this.dataService.uploadFileWithProgress(file).subscribe(
        (event: any) => {
          if (event.type === "progress") {
            console.log(`Upload progress: ${event.progress}%`);
            this.toastr.info(`Uploading ${event.progress}%`);
          } else if (event.type === "complete") {
            console.log("Upload complete!", event.body);
            this.toastr.info("Uploaded");
            let r = event;

            let doc = r.body.result.document;
            let url;
            if (doc) {
              let surl = `/image/${doc.file_id}`;
              url = `${this.dataService.file_base_url}${surl}`;
            } else {
              let photos = r.body.result.photo;

              let photo = photos[2] || photos[1] || photos[0];
              let surl = `/image/${photo.file_id}`;
              url = `${this.dataService.file_base_url}${surl}`;
            }

            this.docs.push({
              name: name,
              url: url,
            });
            this.parseService.uploading = false;
          }
        },
        (error) => {
          console.error("Upload error:", error);
        }
      );
    };

    fileInput.click();
  }

  async removeDocument(doc: any, index:any) {
    this.docs.splice(index, 1);
  }

  get listItems() {
    return this.contractForm.get("items") as FormArray;
  }
}
