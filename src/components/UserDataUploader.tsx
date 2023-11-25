import React, { useState, ChangeEvent, FormEvent } from 'react';
import * as XLSX from 'xlsx';
import RepoProvider from '../lib/repositories/RepoProvider.ts';
import { User, filterValidUsers } from '../Models/User.ts';
import { Alert } from '@mui/material';

export const UserDataUploader = () => {
  // onchange states
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)


  // onchange event
  const handleFile = (e: ChangeEvent<HTMLInputElement>): void => {
    let fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    let selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target?.result as ArrayBuffer);
        };
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select a file');
    }
  };

  // submit event
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (excelFile !== null) {
      try {
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data);

        if (data) {
          console.log('in');

          setLoader(true)
          await RepoProvider.getUserRepo().saveUsers(filterValidUsers(data as unknown as User[]))
          setLoader(false)
          setSuccess(true)
        }

      } catch (error) {
        console.error('Error reading Excel file:', error);
        setTypeError('Error reading Excel file. Please try again.');
      }
    }
  };

  return (
    <div>

      {success &&
        <Alert variant="filled" onClose={() => { setSuccess(false) }}>All Users Uploaded You can see in all users tab!</Alert>}

      <div className="wrapper d-flex flex-column justify-content-center align-items-center mt-5 ">
        <h3 className='mb-5'>Upload & View Excel Sheets</h3>

        {/* form */}
        <form className="form-group custom-form" onSubmit={handleFileSubmit}>
          <input type="file" className="form-control" required onChange={handleFile} />
          <button type="submit" className="btn btn-primary btn-md mt-3" disabled={!excelFile || loader}>

            {loader ? "Loading.." : "Upload"}
          </button>
          {typeError && <div className="alert alert-danger" role="alert">{typeError}</div>}
        </form>
      </div>
    </div>
  );
};
