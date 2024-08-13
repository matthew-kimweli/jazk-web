import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";
import * as Parse from "parse";
import { DomSanitizer } from "@angular/platform-browser";
@Injectable({
  providedIn: "root",
})
export class ParseService {
  fetching = false;
  saving = false;
  counting: boolean = false;
  submitting: boolean = false;
  uploading: boolean = false;
  deleting: boolean = false;
  inboxCount: number = 0;

  constructor(
    public toastr: ToastrService,
    public auth: AuthService,
    public sanitizer: DomSanitizer
  ) {}

  async saveQuick(object: Parse.Object) {
    try {
      this.saving = true;
      this.toastr.info("Saving", "Please wait...");
      await object.save();
      this.toastr.success("Saved", "Successful");
      this.saving = false;
      return object;
    } catch (error: any) {
      this.toastr.error("Error", error.message);
      console.log(error);
      this.saving = false;
      return;
    }
  }

  async save(object: Parse.Object, data?: any) {
    try {
      this.saving = true;
      this.toastr.info("Saving", "Please wait...");

      let user = this.auth.currentUser;
      object.set("lastUpdatedBy", user?.id);
      if (object.isNew()) {
        object.set("createdBy", user?.id);
      }
      await object.save(data);
      this.toastr.success("Saved", "Successful");
      this.saving = false;
      this.submitting = false;
      return object;
    } catch (error: any) {
      this.toastr.error("Error", error.message);
      console.log(error);
      this.saving = false;
      return;
    }
  }

  async find(query: Parse.Query) {
    try {
      this.fetching = true;
      query.descending("createdAt");
      let list = await query.find();
      this.fetching = false;
      return list;
    } catch (error: any) {
      console.error(error);
      this.toastr.error("Error", error.message);
      this.fetching = false;
      return;
    }
  }

  async first(query: Parse.Query) {
    try {
      this.fetching = true;
      let item = await query.first();
      this.fetching = false;
      return item;
    } catch (error: any) {
      console.error(error);
      this.toastr.error("Error", error.message);
      this.fetching = false;
      return;
    }
  }

  async count(query: Parse.Query): Promise<any> {
    try {
      this.counting = true;
      let count = await query.count();
      this.counting = false;
      return count;
    } catch (error: any) {
      console.error(error);
      this.toastr.error("Error", error.message);
      this.counting = false;
      return;
    }
  }

  async get(query: Parse.Query, id: any): Promise<any> {
    try {
      this.fetching = true;
      let object = await query.get(id);
      this.fetching = false;
      return object;
    } catch (error) {
      console.error(error);
      this.fetching = false;
    }
  }

  async delete(object: Parse.Object): Promise<any> {
    try {
      this.toastr.info("Deleting...", "Please wait...");
      this.deleting = true;
      await object.destroy();
      this.deleting = false;
      this.toastr.success("Deleted", "Successfully");
      return object;
    } catch (error) {
      console.error(error);
      this.toastr.error("Error", "Unable to delete. Please try again");
      this.deleting = false;
    }
  }

  async uploadFileParse(
    file: File,
    fileAlias: any
  ): Promise<Parse.File | undefined> {
    function sanitizeFileName(fileName: any) {
      // Remove all characters that are not letters (alphabetic characters)
      return fileName.replace(/[^a-zA-Z]/g, "");
    }

    const parseFile = new Parse.File(sanitizeFileName(file.name), file);
    this.uploading = true;
    try {
      this.toastr.info("Uploading...", "Please wait...");
      // Save the Parse File (only on the client side)
      const savedFile = await parseFile.save();
      this.toastr.success("Uploaded.");

      console.log("File uploaded and saved:", savedFile);
      this.uploading = false;
      return savedFile;
      // Do something with the saved file, like displaying it
    } catch (error: any) {
      this.uploading = false;
      console.error("Error saving file:", error);
      this.toastr.success("Uploading Failed.");
      return;
    }
  }

  async sendEMail(params: { to: string; subject: string; html: string }) {
    try {
      await Parse.Cloud.run("sendMail", params);
      console.log("email sent", params.to);
    } catch (error) {
      console.error(error);
    }
  }

  sanitiseUrl(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
