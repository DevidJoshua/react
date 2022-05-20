import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import CsvDownload from 'react-json-to-csv'

const reshapeData = (data) =>{
    let reshapedData = data.map(r=>Object.values(r))
    return reshapedData
}

export const exportTo =(opt = 'pdf',fileName = 'document',data,header) => {
    switch(opt){
        case 'pdf': toPdf(data,fileName,header); break;
        case 'csv': toCsv(data,fileName,header); break;
        case 'xlsx': toXlx(data,fileName,header); break;
        case 'txt': toTxt(data,fileName,header); break;
    }
}

export const toCsv = (data,fileName,header) =>{
    let reshapedData = reshapeData(data)
    reshapedData.unshift(header)
    let csvContent = "data:text/csv;charset=utf-8," + reshapedData.map(e => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${fileName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  
}

export const toPdf = (data,fileName,header) =>{
    let reshapedData = reshapeData(data)
    const doc = new jsPDF()
    doc.autoTable({
        head: [header],
        body: reshapedData,
    })
    doc.save(`${fileName}.pdf`)
}

export const toXlx = (data,fileName,header) =>{
console.log('excel file')
    let arr = reshapeData(data)
    arr.unshift(header) 
    // var lineArray = [];
    // arr.forEach(function(infoArray, index) {
    //     var line = infoArray.join("     ");
    //     lineArray.push(index == 0 ? line : line);
    // });
    var csvContent = arr.map(e => e.join(",")).join("\n");
    // console.log('csvcontent=======>',lineArray)
    var excel_file = document.createElement('a');
    excel_file.setAttribute('href', 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(csvContent));
    excel_file.setAttribute('download', `${fileName}.xlsx`);
    document.body.appendChild(excel_file);
    excel_file.click();
    document.body.removeChild(excel_file);
}

export const toTxt = (data,fileName,header) =>{
    //reshape to text data
    // let dataText  = "";
    
    // dataText += "|\t"+header.join("\t|\t")+"\t|"
    // const txtLength = dataText.length
    // dataText += "\n"
    // for(let i=0; i<txtLength;i++){
    //     dataText += "="
    // }

    // dataText += "\n"

    // reshapeData(data).map(r=>{
    //     dataText += "\t|"+r.join('\t|\t')+"\t|"
    // })

    // for(let i=0; i<txtLength;i++){
    //     dataText += "="
    // }
    let reshapedData = reshapeData(data)
    reshapedData.unshift(header)
    const dataText = reshapedData.map(e => e.join(",")).join("\n")

    var textFile = new Blob([dataText], {type: 'text/plain;charset=utf-8'});
    
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    const textFileUrl = window.URL.createObjectURL(textFile);
    
    var link = document.createElement("a");
    link.setAttribute("href", textFileUrl);
    link.setAttribute("download", `${fileName}.txt`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


