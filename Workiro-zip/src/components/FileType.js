import pdfIcon from '../images/files-icon/pdf.png';
import xlsIcon from '../images/files-icon/xls.png';
import mailIcon from '../images/files-icon/mail.png';
import docIcon from '../images/files-icon/doc.png';
import csvIcon from '../images/files-icon/csv.png';
import htmlIcon from '../images/files-icon/html.png';
import unknownIcon from '../images/files-icon/unknown.png';
import pngIcon from '../images/files-icon/png.png';
import jpgIcon from '../images/files-icon/jpg.png';

const GetFileType = ({Type}) => {
   // Extracting data object from row
   //Type=Type.tolotoLowerCase();
   // console.log("file type", Type)
    let img; // Variable to hold the icon

    // Checking the Type property of the data object
    if (Type === "pdf") {
        // If Type is "pdf", assign PDF icon
        img = (
            <div className='img-format'>
                <img src={pdfIcon} />
            </div>
        );
    }
    else if (Type === "excel") {
        img = (
            <div className='img-format'>
                <img src={xlsIcon} />
            </div>
        )
    }
    else if (Type === "xlsx") {
        img = (
            <div className='img-format'>
                <img src={xlsIcon} />
            </div>
        )
    }
    else if (Type === "doc") {
        img = (<div className='img-format'>
            <img src={docIcon} />
        </div>)
    }
    else if (Type === "rtf") {
        img = (<div className='img-format'>
            <img src={docIcon} />
        </div>)
    }
    else if (Type === "docx") {
        img = (<div className='img-format'>
            <img src={docIcon} />
        </div>)
    }
    else if (Type === "msg") {
        img = (<div className='img-format'>
            <img src={mailIcon} />
        </div>)
    }
    else if (Type === "eml") {
        img = (<div className='img-format'>
            <img src={mailIcon} />
        </div>)
    }
    else if (Type === "csv") {
        img = (<div className='img-format'>
            <img src={csvIcon} />
        </div>)
    }
    else if (Type === "html") {
        img = (<div className='img-format'>
            <img src={htmlIcon} />
        </div>)
    }
    else if (Type === "png") {
        img = (<div className='img-format'>
            <img src={pngIcon} />
        </div>)
    }
    else if (Type === "jpg") {
        img = (<div className='img-format'>
            <img src={jpgIcon} />
        </div>)
    }
    else  {
        img = (<div className='img-format'>
            <img src={unknownIcon} />
        </div>)
    }

    return img; // Returning the icon
}

export default GetFileType;