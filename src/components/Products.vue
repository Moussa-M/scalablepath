<template>
<div class="container mx-auto px-4 sm:px-8 max-w-6xl">
    <div class="py-8">
        <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
            <h2 class="text-2xl leading-tight">
                Products
            </h2>
            <div class="text-end">
                <form class="flex w-full max-w-sm space-x-3">
                    <div class=" relative ">
                        <input v-model="filter" type="text" id="&quot;form-subscribe-Filter" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name" />
                    </div>

                </form>
            </div>
        </div>
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <div class="grid md:grid-cols-3 auto-rows-max md:gap-4 ">
                    <transition v-for="product in filterList(filter,$store.state.data.products)" :key="product.id" name="list" tag="div">
                        <div style="height:350px" class="overflow-hidden shadow-lg rounded-lg  cursor-pointer m-auto">
                            <a href="#" class="w-full block">
                                <img alt="blog photo" :src="product.image" class="max-h-40 w-full object-cover" />
                                <div class="bg-white dark:bg-gray-800 w-full p-4">
                                    <p class="text-indigo-500 text-md font-medium">
                                    </p>
                                    <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        {{product.name}} ({{product.price}} $)
                                    </p>
                                    <p class="text-gray-400 dark:text-gray-300 font-light text-md">
                                        {{product.desc}}
                                    </p>

                                </div>
                            </a>
                            <div class="flex justify-end items-end m-2">

                                <button @click="editProduct(product)" type="button" class="rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Edit
                                </button>

                                <button @click="removeProduct(product.id)" type="button" class="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </transition>
                </div>

            </div>
        </div>
        <button @click="newProduct={name:'',desc:'',price:0,status:'available',image:`https://picsum.photos/400?image=${Math.floor(Math.random() * 100)}`}" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
            Add Product
        </button>
    </div>

    <transition name="fade">
        <div v-if="currentProduct" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <form novalidate @submit.prevent="updateProduct" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
                            <div class="col-span-2 lg:col-span-1">
                                <div class=" relative ">
                                    <input type="text" v-model="currentProduct['name']" id="name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name" />
                                </div>
                            </div>
                            <div class="col-span-2 lg:col-span-1">
                                <div class=" relative ">
                                    <input type="number" v-model="currentProduct['price']" id="name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Price" />
                                </div>
                            </div>

                            <div class="col-span-2">
                                <label class="text-gray-700" for="name">
                                    <textarea v-model="currentProduct['desc']" class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your description" name="comment" rows="5" cols="40">
                            </textarea>
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="updateProduct" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Update
                        </button>
                        <button @click="currentProduct = null" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div v-if="newProduct" class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <!-- This element is to trick the browser into centering the modal contents. -->
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <form novalidate @submit.prevent="updateProduct" class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
                            <div class="col-span-2 lg:col-span-1">
                                <div class=" relative ">
                                    <input type="text" v-model="newProduct['name']" id="name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name" />
                                </div>
                            </div>
                            <div class="col-span-2 lg:col-span-1">
                                <div class=" relative ">
                                    <input type="number" v-model="newProduct['price']" id="name" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Price" />
                                </div>
                            </div>

                            <div class="col-span-2">
                                <label class="text-gray-700" for="name">
                                    <textarea v-model="newProduct['desc']" class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your description" name="comment" rows="5" cols="40">
                            </textarea>
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button @click="addProduct" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Add
                        </button>
                        <button @click="newProduct = null" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    data() {
        return {
            filter: null,
            currentProduct: null,
            newProduct: null,
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        addProduct() {
            this.$store.dispatch('data/addProduct', this.newProduct).then(() => {
                this.newProduct = null;
            })
        },
        removeProduct(id) {
            this.$store.dispatch('data/removeProduct', id);
        },
        editProduct(product) {
            this.currentProduct = JSON.parse(JSON.stringify(product)) ;
        },
        updateProduct() {
            this.$store.dispatch('data/updateProduct', this.currentProduct).then(() => {
                this.currentProduct = null;
            })
        },
        filterList(q, list) {
            return q ? list.filter(item => item.name.toLowerCase().includes(q.toLowerCase())) : list;
        }
    },

    mounted() {
        this.$store.dispatch('data/getProducts');
    },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to

/* .list-leave-active below version 2.1.8 */
    {
    opacity: 0;
    transform: translateY(30px);
}
</style>
