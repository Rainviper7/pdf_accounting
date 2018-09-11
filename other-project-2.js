const _ = require('lodash'),
    moment = require('moment'),
    AccountingReport = require('./index'),   // require('mon-niceloop-report')
    _data = require('./libs/receipt_pdf/mock_data').data
    ;

var time = new Date,
    datetime2 = moment(time).format("DDMM_HHmmss"),
    filename = "./output/receipt_pdf_" + datetime2 + ".pdf"
    ;

var params_default = {
    filePath: filename,
    data: _data
}

function build() {

    new AccountingReport.receiptReport(params_default, function (filePath) {
        console.log("Gen file pdf complete : " + filePath)
    })


}

build()