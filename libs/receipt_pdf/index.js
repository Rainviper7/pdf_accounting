const path = require('path'),
    _ = require('lodash'),
    moment = require('moment'),

    PdfPrinter = require('../../node_modules/pdfmake/src/printer'),
    C = require('./constant')
    ;

var fonts = {
    Roboto: {
        normal: './libs/receipt_pdf/fonts/droidsansth.ttf',
        bold: './libs/receipt_pdf/fonts/arialbd.ttf',
        italics: './libs/receipt_pdf/fonts/Roboto-Italic.ttf',
        bolditalics: './libs/receipt_pdf/fonts/Roboto-MediumItalic.ttf'
    },
    Customs: {
        normal: './libs/receipt_pdf/fonts/Roboto-Regular.ttf',
        bold: './libs/receipt_pdf/fonts/Roboto-Medium.ttf'
    }
};

module.exports = function (options, callback) {
    var printer = new PdfPrinter(fonts);
    var fs = require('fs')
        ;

    var filename = options.filePath;

    var data = options.data,
        dateStamp = moment(data.date).format("DD/MM/YYYY")
        ;

    //-------หน้ารายงาน
    // var docDefinition = drawDocDefinition();
    var companies = []
    _.forEach(data, function (customer, index) {
        companies.push(drawDocDefinition(customer))
    });


    var res = []
    _.forEach(companies, function (contentArray, index) {


        _.forEach(contentArray, function (data2, index2) {
            res.push(data2)
        });

    });

    var docDefinition = {
        content: companies,
        pageSize: 'A4',
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [50, 50, 50, 50]
    }
    // var docDefinition = drawDoc2();

    //----------main
    buildReport(docDefinition);

    function buildReport(dd) {

        //-------------------------operate
        var pdfDoc = printer.createPdfKitDocument(dd);
        pdfDoc.pipe(fs.createWriteStream(filename));
        console.log("--receipt completed")
        pdfDoc.end();

        setTimeout(function () {
            callback(filename);
        }, 1500);
    }

    function drawDocDefinition(company) {
        return [

            {
                style: C.FONT_STYLES.tableExample,
                table: {
                    widths: [150, 350],
                    body: drawHeader(),
                },
                layout: 'noBorders'
            },
            blankCell(), blankCell(), blankCell(),
            blankCell(), blankCell(),
            {
                text: 'ใบเสร็จรับเงิน / ใบกำกับภาษี',
                style: C.FONT_STYLES.HEADER,
                alignment: 'center'
            },
            NewLine(2),
            {
                text: 'Customer',
                bold: true
            }, {
                style: C.TABLE_STYLES.TABLE_EXAMPLE,
                table: {
                    widths: [375, 100],
                    body: drawCustomerInfo(company)
                },
                layout: 'noBorders'

            },
            NewLine(2)
            ,
            //------------------itemList
            {
                style: [C.TABLE_STYLES.TABLE_EXAMPLE, C.FONT_STYLES.NORMAL],
                table: {
                    heights: 15,
                    widths: [150, 50, 100, 50, 100],
                    body: drawDetail(company.list)
                },
                layout: C.TABLE_STYLES.LAYOUT.THIN_GRAY
            },
            NewLine(2),
            {
                style: [C.TABLE_STYLES.TABLE_EXAMPLE, C.FONT_STYLES.NORMAL],
                table: {
                    widths: [295, 70, 100],
                    body: drawSummaryChart(company)
                },
                layout: C.TABLE_STYLES.LAYOUT.THIN_GRAY
            },
            blankCell(), blankCell(), blankCell(),
            {
                style: [C.TABLE_STYLES.TABLE_EXAMPLE, C.FONT_STYLES.NORMAL],
                table: {
                    widths: [90, 150, 10, 110, 80],
                    body: drawFooter()
                },
                layout: 'noBorders'
            },
            {
                text: '',
                pageOrientation: 'portrait',
                pageBreak: 'before'
            }
        ]
    }

    function drawHeader() {
        return [
            [
                {
                    alignment: 'center',
                    rowSpan: 3,
                    image: './libs/receipt_pdf/img/niceloop_logo.png',
                    width: 100,
                    height: 41
                },
                {
                    text: 'บริษัท ไนซ์ลูป จำกัด (สำนักงานใหญ่)',
                    style: C.FONT_STYLES.SUBHEADER
                }
            ],
            [
                blankCell(),
                {
                    text: '41/7 หมู่บ้านสวนฉัตร ซอย5 แขวงสามเสนนอก เขตห้วยขวาง กทม. 10310',
                    style: C.FONT_STYLES.NORMAL
                },
            ],
            [
                blankCell(),
                {
                    text: 'เลขประจำตัวผู้เสียภาษีอากร : ' + '0-1355-57000-06-1',
                    style: C.FONT_STYLES.NORMAL
                }
            ]
        ]

    }

    function drawFooter() {
        return [
            [
                blankCell(),
                {
                    alignment: 'center',
                    text: 'ลายเซ็นต์ลูกค้า',
                    style: C.FONT_STYLES.NORMAL
                },
                blankCell(),
                {
                    alignment: 'center',
                    text: 'ลายเซ็นต์ผู้รับ',
                    style: C.FONT_STYLES.NORMAL
                },
                blankCell()
            ],
            [
                blankCell(),
                blankCell(),
                blankCell(),
                {
                    alignment: 'center',
                    image: './libs/receipt_pdf/img/DisplayUserSignatureImage.png',
                    width: 50,
                    height: 20
                },
                {
                    alignment: 'center',
                    rowSpan: 2,
                    image: './libs/receipt_pdf/img/DisplayOrganizationStampImage.png',
                    width: 75,
                    height: 30
                }
            ],
            [
                blankCell(), {
                    alignment: 'center',
                    text: '------------------------------------',
                    style: C.FONT_STYLES.NORMAL
                },
                blankCell(),
                {
                    alignment: 'center',
                    text: '------------------------------------' + '\n' +
                        '( ' + dateStamp + ' )',
                    style: C.FONT_STYLES.NORMAL
                },
                blankCell()
            ]
        ]
    }

    function drawCustomerInfo(info) {
        return [
            [
                {
                    text: info.customer.name + ' ' + info.customer.branchName,
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: 'วันที่ : ' + dateStamp,
                    style: C.FONT_STYLES.NORMAL
                }
            ],
            [
                {
                    text: info.customer.address,
                    style: C.FONT_STYLES.NORMAL
                },
                {
                    text: 'เลขที่ : ' + info.receiptId,
                    style: C.FONT_STYLES.NORMAL
                }
            ],
            [
                {
                    text: 'เลขที่ผู้เสียภาษี : ' + info.customer.taxId,
                    style: C.FONT_STYLES.NORMAL
                },
                blankCell()
            ]
        ]
    }

    function drawDetail(list) {

        var data = []
        _.forEach(list, (line) => {
            data.push([
                line.name,
                line.qty,
                {
                    alignment: 'right',
                    text: numberWithComma(line.unitPrice)
                },
                {
                    alignment: 'right',
                    text: numberWithComma(line.itemDiscount)
                },
                {
                    alignment: 'right',
                    text: numberWithComma(line.total)
                }
            ])
        })

        let tableList = [
            [
                { text: 'Item', bold: true },
                { text: 'Qty', bold: true },
                { text: 'UnitPrice', bold: true },
                { text: 'Discount', bold: true },
                { text: 'Total', bold: true }
            ],
            ...data
        ]
        return tableList
    }

    function drawSummaryChart(summary) {
        return [
            [
                {
                    rowSpan: 4,
                    text: 'Remark : ' + summary.remark

                },
                'SUBTOTAL', { alignment: 'right', text: summary.subTotal }],
            [blankCell(), 'DISCOUNT', { alignment: 'right', text: summary.discount }],
            [blankCell(), 'VAT', { alignment: 'right', text: summary.vat }],
            [blankCell(), 'GRAND TOTAL', { alignment: 'right', text: numberWithComma(summary.grandTotal) }]

        ]
    }

    function NewLine(count) {
        for (i = 0; i < count; i++) {
            return '\n'
        }

    }

    function blankCell() {
        return {
            text: ' ',
            style: C.FONT_STYLES.NORMAL
        }
    }
    function numberWithComma(n) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
}