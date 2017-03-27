<script>
    import Vue from 'vue'
    import lodash from 'lodash'
    import moment from 'moment'
    import accounting from 'accounting'


    /*
        === === === === === === ===
        ** ACCOUNTING.JS Library **
        === === === === === === ===
    */
    /*
        Use Case : {{ 1234567.89 | formatMoney('€', 2, ' ', ',', '%v%s') }} => 1 234 567.89 €
        %v => value
        %s => symbol
    */
    Vue.filter('formatMoney', (number, symbol = "$", precision = 2, thousand = ",", decimal = ".", format = "%s%v") => {
        return accounting.formatMoney(number, symbol, precision, thousand, decimal, format)
    })
    /*
        Use Case : {{ 123456 | formatNumber(0, ' ') }} => 123 456
    */
    Vue.filter('formatNumber', (number, precision = 0, thousand = ",", decimal = ".") => {
        return accounting.formatNumber(number, precision, thousand, decimal)
    })


    /*
        === === === === === ===
        ** MOMENT.JS Library **
        === === === === === ===
    */
    /*
        Use case : {{ "2013-02-19 03:59:52 | frenchDate }} => "19.02.2013"
    */
    Vue.filter('formatDate', (date, locale, format) => {
        if (!format) {
            return moment(date).format('MMMM Do YYYY')
        } else {
            return moment(date).locale(locale).format(format)
        }
    })
    /*
        Use case : {{"2004-06-05 10:25:13"|fromnow('fr')}} => "il y a 13 ans"
    */
    Vue.filter('fromnow', (date, locale) => {
        if (!locale) {
            return moment(date).fromNow()
        } else {
            return moment(date).locale(locale).fromNow()
        }
    })


    /*
        === === ===
        ** TEXTS **
        === === ===
    */
    /*
        Use case : {{ "hello" | upper }} => "HELLO"
    */
    Vue.filter('upper', (str) => {
        return _.upperCase(str)
    })
    /*
        Use case : {{ "hello" | capitalize }} => "Hello"
    */
    Vue.filter('capitalize', (str) => {
        return _.upperFirst(str)
    })
    /*
        Use Case : {{ "very long string to truncate" | truncate (7) }} ==> "very..."
    */
    Vue.filter('truncate', (str, length = 30) => {
        return _.truncate(str, {'length':length})
    })

    Vue.filter('sanitize',(str) => {
        return str.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
    })



</script>
