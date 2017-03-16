<template>
    <ul id="pagination" v-if="this.records > this.numberPerPage" class="tabs cc-pills">

        <!-- First -->
        <li :class="[{disabled: !showLeft}]" @click="goFirst">
            <a>&lt;&lt;</a>
        </li>

        <!-- Previous -->
        <li :class="[{disabled: !showLeft}]" @click="goPrev">
            <a>&lt;</a>
        </li>


        <!-- Loop pages -->
        <li v-for="(item, index) in pagination" :class="{ active: item.active, disabled: item.disabled }">
            <a @click="changePage(index)">
                {{ item.text }}
            </a>
        </li>


        <!-- Next -->
        <li :class="[{disabled: !showRight}]" @click="goNext">
            <a>&gt;</a>
        </li>

        <!-- Last -->
        <li :class="[{disabled: !showRight}]" @click="goLast">
            <a>&gt;&gt;</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'pagination',

        props: {
            // Nb total of rows, regardless the pagination
            'records': {
                type: Number,
                required: true
            },

            // Nb of row per page
            'numberPerPage': {
                type: Number,
                required: false,
                default: 10
            },

            // Current page
            'currentpage': {
                required : false,
                validator: function (value) {
                    return _.toNumber(value)
                }
            }
        },

        data() {
            return {
                // by default, first page
                current: 1,

                // gap before/after ellipsis <li> and current <li>
                gap: 2,

                // will contain the pagination structure and datas
                pagination: []
            }
        },

        // When component is created, create the pagination
        created() {

            this.createPagination()
        },

        // Computed datas
        computed: {
            // Show first & prev buttons ?
            showLeft() {

                return this.current > 1
            },
            // Show last & next buttons ?
            showRight() {

                return this.current < this.totalPages()
            }
        },

        watch: {
            // If nb per page changes (cf. select list), create pagination
            numberPerPage() {

                this.current = 1
                this.createPagination()
            },
            // If nb total of items changes, create pagination
            records() {

                this.current = 1
                this.createPagination()
            },
            // If current page changes, create pagination
            current() {

                // Check if current page is not less than 1
                this.current = (this.current < 1) ? 1 : this.current

                // Create pagination
                this.createPagination()
            },
            currentpage() {

                // Set currentpage with the current nb.
                this.current = (this.currentpage < 1) ? 1 : this.currentpage
            }
        },
        methods: {

            // When the page change
            changePage(index) {

                // If click is not on a disabled li (ellipsis ...)
                if(!this.pagination[index].disabled) {



                    // Change current value
                    this.current = this.pagination[index].text

                    // Emit event to the parent :)
                    this.$emit('changepage', this.current)

                }
            },

            // Create the pagination
            createPagination() {

                // Get nb of pages
                let total = this.totalPages()

                // Reset pagination array
                this.pagination = []

                // Calculate the frame between current page
                let frame = this.gap * 2

                // No truncate (no ellipsis)
                if(total < 5 + frame) {
                    this.addPages(..._.range(1, total + 1))
                }
                // With ellipsis
                else {
                    // Right ellipsis only
                    if (this.current < 2 + frame) {
                        this.addPages(..._.range(1, 4 + frame))
                        this.addTroncature()
                        this.addLastPages(total)
                    }
                    // Two ellipsis
                    else if ((frame + 1 < this.current) && (this.current < total - frame)) {
                        this.addFirstPages()
                        this.addTroncature()
                        this.addPages(..._.range(this.current - this.gap, this.current + this.gap + 1))
                        this.addTroncature()
                        this.addLastPages(total)
                    }
                    // Left ellipsis only
                    else {
                        this.addFirstPages()
                        this.addTroncature()
                        this.addPages(..._.range(total - 2 - frame, total + 1))
                    }
                }
            },

            // Add ellipsis into pagination array
            addTroncature() {
                this.pagination.push({ text: '...', active: false, disabled: true })
            },
            addFirstPages() {
                this.addPages(1, 2)
            },
            addLastPages(total) {
                this.addPages(total - 1, total)
            },
            addPages(...valeurs) {
                let that = this
                _.forEach(valeurs, function(valeur) {
                    that.pagination.push({ text: valeur, active: that.current == valeur, disabled: false })
                })
            },

            // Get total of pages
            totalPages() {
                return _.ceil(this.records / this.numberPerPage)
            },


            // Go prev, next, first, last
            goPrev() {
                // Emit to the parent the method 'changepage'
                this.$emit('changepage', --this.current)
            },
            goNext() {
                // Emit to the parent the method 'changepage'
                this.$emit('changepage', ++this.current)
            },
            goFirst() {
                this.current = 1
                // Emit to the parent the method 'changepage'
                this.$emit('changepage', this.current)
            },
            goLast() {
                this.current = this.totalPages()
                // Emit to the parent the method 'changepage'
                this.$emit('changepage', this.current)
            }
        }
    }
</script>
