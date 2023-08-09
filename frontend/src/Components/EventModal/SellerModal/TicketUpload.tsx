import { useEffect, useRef, useState } from "react";
import { Ticket } from "../../../models/Ticket";
import { LanguageSellerModal } from "../../../languageControl/Language";
import "./TicketUpload.scss";

interface props {
  onSubmit: Function;
  tickets: Ticket[];
  data: LanguageSellerModal;
}

function TicketUpload(props: props): JSX.Element {
  const data = props.data.TicketUpload;
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [proof, setProof] = useState<File | null>(null);
  const proofInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const newFilesArr: File[] = [
      ...uploadedFiles.slice(0, props.tickets.length),
    ];
    setUploadedFiles(newFilesArr);
  }, [props.tickets]);

  const addNewFiles = (event: any, files: FileList | null) => {
    event.preventDefault();
    if (!files) return;
    const newFilesArray: any = [...uploadedFiles];
    for (let i = 0; i < files.length; i++) {
      newFilesArray.push(files[i]);
    }
    setUploadedFiles(newFilesArray);
    const isValid = newFilesArray.length === props.tickets.length && proof;
    props.onSubmit(newFilesArray, proof, isValid);
  };

  const removeFile = (file: File) => {
    const newFilesArray = [...uploadedFiles].filter((f) => f !== file);
    setUploadedFiles(newFilesArray);
    props.onSubmit(newFilesArray, proof, false);
  };

  const proofClick = () => proofInput.current?.click();

  const changeProof = (e: any) => {
    const files = e.target.files;
    const isValid = uploadedFiles.length === props.tickets.length && files[0];
    if (files) {
      setProof(files[0]);
      props.onSubmit(uploadedFiles, files[0], isValid);
    } else {
      setProof(null);
      props.onSubmit(uploadedFiles, null, isValid);
    }
  };

  return (
    <div className="TicketUpload">
      <h5 className="sell-ticket-section-header">{data.header}</h5>
      <div className="input-label-container">
        <label
          htmlFor="upload-ticket"
          className="upload-ticket-label"
          onDragOver={(event) => event.preventDefault()}
          onDrop={(e) => addNewFiles(e, e.dataTransfer.files)}
        >
          <i className="fa-solid fa-file-lines"></i>
          {props.tickets.length === uploadedFiles.length ? (
            <span className="done-check-span">{data.done}</span>
          ) : (
            <>
              {data.dragDrop} <br />
              {data.or} <br />
              <span className="browse-span">{data.browse}</span>
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-ticket"
          accept="image/*"
          className="upload-ticket-input"
          onChange={(e) => addNewFiles(e, e.target.files)}
          multiple
          disabled={props.tickets.length === uploadedFiles.length}
          hidden
        />

        <div className="user-files-area">
          {props.tickets.map((t, i) => (
            <div key={i} className="single-ticket">
              {!uploadedFiles[i] ? (
                <div className="ticket-image-holder">{i + 1}</div>
              ) : (
                <>
                  <label
                    className="remove-btn-holder"
                    onClick={() => removeFile(uploadedFiles[i])}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </label>
                  <img
                    src={URL.createObjectURL(uploadedFiles[i])}
                    alt="file"
                    className="ticket-image"
                  />
                  <span className="image-index">{i + 1}</span>
                </>
              )}
            </div>
          ))}
        </div>
        <hr className="inputs-separator" />
        <div className="buyer-proof">
          <span className="proof-header">{data.proof}</span>
          <label className="proof-input-holder" onClick={proofClick}>
            <input
              type="text"
              className="text-field"
              disabled
              value={proof ? `${proof.name} ✔` : data.proofRequired}
            />
            <button className="proof-browse-btn">{data.browse}</button>
          </label>
          <input
            type="file"
            hidden
            ref={proofInput}
            accept="image/*"
            onChange={changeProof}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketUpload;
