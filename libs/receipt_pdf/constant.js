var FONT_STYLES = {
    HEADER: {
        fontSize: 14,
    },
    SUBHEADER: {
        fontSize: 12,
    },
    QUOTE: {
        italics: true
    },
    NORMAL: {
        fontSize: 9
    },
    SMALL: {
        fontSize: 7
    }

}

var TABLE_STYLES = {
    MARGIN_DEFAULT: {
        margin: [0, 5, 0, 15]
    },
    LAYOUT_LINE: {
        THIN_GRAY: {
            hLineWidth: function (i, node) {
                return 0.5
            },
            vLineWidth: function (i, node) {

                return 0.5
            },
            hLineColor: function (i, node) {
                return 'gray'
            },
            vLineColor: function (i, node) {
                return 'gray'
            }
        }
    }
}

exports.FONT_STYLES = FONT_STYLES;
exports.TABLE_STYLES = TABLE_STYLES;