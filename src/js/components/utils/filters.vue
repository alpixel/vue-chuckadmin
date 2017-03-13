<script>
    import Vue from 'vue'
    import moment from 'moment'

    /*
        Use case : {{ "2013-02-19 03:59:52 | frenchDate }} => "19.02.2013"
    */
    Vue.filter('formatDate',function(date, locale, format){
        if (!format) {
            return moment(date).format('MMMM Do YYYY')
        } else {
            return moment(date).locale(locale).format(format)
        }
    })

    /*
        Use case : {{ "hello" | upper }} => "HELLO"
    */
    Vue.filter('upper',function(str){
        return str.toUpperCase()
    })

    /*
        Use case : {{ "hello" | capitalize }} => "Hello"
    */
    Vue.filter('capitalize',function(str){
        return str.charAt(0).toUpperCase() + str.slice(1)
    })
</script>
