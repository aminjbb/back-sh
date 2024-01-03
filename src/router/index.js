import {
  createRouter,
  createWebHistory
} from 'vue-router'
/* Auth */
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login/LoginView.vue'

/* Category */
import CategoryView from '../views/Categories/CategoryView.vue'
import AddCategoryView from '../views/Categories/AddCategoryView.vue'
import EditCategoryView from '../views/Categories/EditCategoryView.vue'

/* Brands */
import BrandsView from '../views/Brands/BrandsView.vue'
import AddBrandView from '../views/Brands/AddBrandView.vue'
import EditBrandView from '../views/Brands/EditBrandView.vue'

/* Colors */
import ColorsView from '../views/Colors/ColorsView.vue'
import AddColorView from '../views/Colors/AddColorView.vue'
import EditColorView from '../views/Colors/EditColorView.vue'

/* Attributes */
import AttributesView from '../views/Attributes/AttributesView.vue'
import AddAttributesView from '../views/Attributes/AddAttributesView.vue'
import CreateProductView from '../views/Prodcuts/CreateProductView.vue'
import EditAttributeView from '../views/Attributes/EditAttributeView.vue'

/* Export */
import ExportView from '../views/Exports/ExportView.vue'
import GetExportView from '../views/Exports/GetExportView.vue'

/* Notifications */
import NotificationsView from '../views/Notifications/NotificationsView.vue'
import CreateNotificationsView from '../views/Notifications/CreateNotificationsView.vue'
import GetNotificationsView from '../views/Notifications/GetNotificationsView.vue'

/* Product */
import ProductView from '../views/Prodcuts/ProductView.vue'
import AddProductView from '../views/Prodcuts/AddProductView.vue'
import EditProductView from '../views/Prodcuts/EditProductView.vue'
import ProductUploadImageView from '../views/Prodcuts/ProductUploadImageView.vue'

/* Sku */
import SkuUploadImageView from '../views/Skues/SkuUploadImageView.vue'
import SkuGroupUploadImageView from '../views/Skues/SkuGroupUploadImageView.vue'
import SkuView from '../views/Skues/SkuView.vue'
import SkuEditView from '../views/Skues/SkuEditView.vue'
import SkuGroupEditView from '../views/Skues/SkuGroupEditView.vue'
import CreateSku from '../views/Skues/CreateSku.vue'
import CreateProductSkuGroup from '../views/Skues/CreateProductSkuGroup.vue'

/* Ticket */
import GetTicketView from '../views/Tickets/GetTicketView.vue'
import CreateNewTickets from '../views/Tickets/CreateNewTicketView.vue'
import TicketList from '../views/Ticket/TicketDashboard.vue'

/* chat */
import ChatView from '../views/Chat/ChatView.vue'
/* Admin management */
import AdminListView from '../views/Admin/AdminListView.vue'
import CreateAdminView from '../views/Admin/CreateAdminView.vue'
import EditAdminView from '../views/Admin/EditAdminView.vue'
import UserListView from '../views/User/UserListView.vue'
import CreateUserView from '../views/User/CreateUserView.vue'
import EditUserView from '../views/User/EditUserView.vue'

/* admin permission */
import PermissionListView from '../views/Admin/Permssion/PermissionListView.vue'
import RolePermissionListView from '../views/Admin/RolePermission/RolePermissionListView.vue'
import CreateRolePermissionView from '../views/Admin/RolePermission/CreateRolePermissionView.vue'
import EditRolePermissionView from '../views/Admin/RolePermission/EditRolePermissionView.vue'

/* Warehouse */
import WarehouseListView from '../views/Warehouse/WarehouseListView.vue'
import CreateWarehouseView from '../views/Warehouse/CreateWarehouseView.vue'
import EditWarehouseView from '../views/Warehouse/EditWarehouseView.vue'
import SpecialCapacityView from '../views/Warehouse/SpecialCapacityView.vue'

/* Driver Management*/
import DriverManagementView from '../views/DriverManagement/DriverManagementView.vue'
import AddDriverManagementView from '../views/DriverManagement/AddDriverManagementView.vue'
import EditDriverManagementView from '../views/DriverManagement/EditDriverManagementView.vue'

/* Supplier */
import SupplierListView from '../views/Supplier/SupplierListView.vue'
import CreateSupplierView from '../views/Supplier/CreateSupplierView.vue'
import EditSupplierView from '../views/Supplier/EditSupplierView.vue'

/* Seller */
import CreateSellerView from '@/views/Seller/CreateSellerView.vue'
import SellerListView from '../views/Seller/SellerListView.vue'
import CreateNaturalSellerView from '../views/Seller/CreateNaturalSellerView.vue'
import CreateLegalSellerView from '../views/Seller/CreateLegalSellerView.vue'
import EditNaturalSellerView from '../views/Seller/EditNaturalSellerView.vue'
import EditLegalSellerView from '../views/Seller/EditLegalSellerView.vue'
import AddSkuSellerView from '../views/Seller/AddSkuSellerView.vue'
import PriceHistoryView from '../views/Seller/Histories/PriceHistoryView.vue'
import SiteInventoryHistoryView from '../views/Seller/Histories/SiteInventoryHistoryView.vue'
import WarehouseInventoryHistoryView from '../views/Seller/Histories/WarehouseInventoryHistoryView.vue'

/* Page */
import UpdateTemplateView from '@/views/Page/Update/UpdateTemplateView.vue'
import UpdateSeoView from '@/views/Page/Update/UpdateSeoView.vue'
import UpdateContentView from '@/views/Page/Update/UpdateContentView.vue'
import UpdateImagesView from '@/views/Page/Update/UpdateImagesView.vue'
import PageListView from '../views/Page/PageListView.vue'

/* Menu */
import MenuListView from '@/views/Menu/MenuListView.vue'
import AddMenuView from '@/views/Menu/AddMenuView.vue'
import AddImageMenuView from '@/views/Menu/AddImageMenuView.vue'
import EditMenuView from '@/views/Menu/EditMenuView.vue'

/* PromotionPages */
import PromotionPagesListView from '@/views/PromotionPages/PromotionPagesListView.vue'
import CreatePromotionPageView from "@/views/PromotionPages/CreatePromotionPageView.vue";
import EditPromotionPageView from "@/views/PromotionPages/EditPromotionPageView.vue";
import AddSkuGroupView from "@/views/PromotionPages/AddSkuGroupView.vue";

/* Page slider */
import PageSliderListView from '../views/PageSlider/SliderListView.vue'
import AddPageSliderView from '../views/PageSlider/AddSliderView.vue'
import SliderSkuList from '../views/PageSlider/SliderSkuListView.vue'

/* Home page management */
import HomePageSectionListView from "@/views/HomePage/HomePageSectionListView.vue";
import HomePageBannerListView from "@/views/HomePage/HomePageBannerListView.vue";
import HomePageSpecialSaleListView from "@/views/HomePage/HomePageSpecialSaleListView.vue";
import HomePageSpecialAddView from "@/views/HomePage/HomePageSpecialAddView.vue";
import HomePageSpecilaShpsAddView from "@/views/HomePage/HomePageSpecilaShpsAddView.vue";
import HomePageCategoryListView from "@/views/HomePage/HomePageCategoryListView.vue";
import HomePagePartitionSliderView from "@/views/HomePage/HomePagePartitionSliderView.vue";
import HomePagePartitionSliderAddSkuView from "@/views/HomePage/HomePagePartitionSliderAddSkuView.vue";
import HomePageSkuWithSectionView from "@/views/HomePage/HomePageSkuWithSectionView.vue";
import HomePageAddSkuToSectionView from "@/views/HomePage/HomePageAddSkuToSectionView.vue";
import HomePageBrandSectionView from "@/views/HomePage/HomePageBrandSectionView.vue";
import HomePageAddSkuSectionView from "@/views/HomePage/HomePageAddSkuSectionView.vue";
import HomePageBlogSectionView from "@/views/HomePage/HomePageBlogSectionView.vue";
import HomePageAdsBannerView from "@/views/HomePage/HomePageAdsBannerView.vue";
import HomePageGiftSectionView from "@/views/HomePage/HomePageGiftSectionView.vue";
import HomePageSpecialEditView from "@/views/HomePage/HomePageSpecialEditView.vue";
import RetailShipmentListView from "@/views/RetailShipment/RetailShipmentListView.vue";
import AddShpsToRetailShipmentView from "@/views/RetailShipment/AddShpsToRetailShipmentView.vue";

/* Shipment */
import ShipmentRequestsView from '../views/ShipmentRequests/ShipmentRequestsView.vue'

/* Factor */
import FactorListView from '../views/Factor/FactorListView.vue'
import AddFactorView from '../views/Factor/AddFactorView.vue'
import EditFactorView from '../views/Factor/EditFactorView.vue'
import PricingListView from '../views/Factor/PricingListView.vue'
import PrintFactorView from '../views/Factor/PrintFactorView.vue'

/* RetailShipment */
import AllRetailShipmentListView from "@/views/RetailShipment/AllRetailShipmentListView.vue";
import EditShpsToRetailShipmentView from "@/views/RetailShipment/EditShpsToRetailShipmentView.vue";

/* Crossdock */
import CrossDockListView from "@/views/Seller/Crossdock/CrossDockListView.vue";
import AddCrossDockView from "@/views/Seller/Crossdock/Add/AddCrossDockView.vue";

/* Vehicle */
import VehicleListView from '../views/Vehicle/VehicleListView.vue'
import ProcessingShipmentIndexView from "@/views/ProcessingShipment/ProcessingShipmentIndexView.vue";
import ProcessingShipmentShpsListView from "@/views/ProcessingShipment/ProcessingShipmentShpsListView.vue";

/* Package */
import PackageListView from '../views/Package/PackageListView.vue'
import PackageHistoryView from '../views/Package/PackageHistoryView.vue'

/* Active Package Requests */
import ActivePackageListView from '../views/ActivePackage/PackageListView.vue'

/* Placement */
import PlacementListView from '../views/Placement/PlacementListView.vue'
import PlacementShpssListView from '../views/Placement/PlacementShpssListView.vue'

/* Cargo Management */
import CargoListingView from "@/views/Cargo/CargoListingView.vue";
import CargoPackageView from "@/views/Cargo/CargoPackageView.vue";
import CargoReceivingListView from "@/views/Cargo/CargoReceivingListView.vue";

/* Package Placement */
import PackagePlacementListView from "@/views/PackagePlacement/PackagePlacementListView.vue";
import PackagePlacementScanView from "@/views/PackagePlacement/PackagePlacementScanView.vue";
import ShpsLocationView from "@/views/PackagePlacement/Locationg/ShpsLocationView.vue";
import ShpsListLocatingToShelfView from "@/views/PackagePlacement/Locationg/ShpsListLocatingToShelfView.vue";

/* Warehouse inventory */
import WarehouseInventoryListView from "@/views/WarehouseInventory/WarehouseInventoryListView.vue";
import LocatingDashboardView from "@/views/PackagePlacement/Locationg/LocatingDashboardView.vue";

/* Wast and lost */
import WasteAndLostListView from "@/views/WasteAndLost/WasteAndLostListView.vue";
import AddWasteAndLostView from "@/views/WasteAndLost/AddWasteAndLostView.vue";


/* Bulk Label Print */
import BulkLabelPrintListView from "@/views/BulkLabelPrint/BulkLabelPrintListView.vue";
import WarehouseOrderListView from "@/views/WarehouseOrders/WarehouseOrderListView.vue";
import CargoPrintView from "@/views/Cargo/CargoPrintView.vue";
import ShipmetDetailPrintView from "@/views/ProcessingShipment/ShipmentDetailPrintView.vue";
import ShipmentDetailPrintView from "@/views/ProcessingShipment/ShipmentDetailPrintView.vue";


/* Orders */
import OrderListView from "@/views/Orders/OrderListView.vue";
import orderEditUser from "@/views/Orders/orderEditUser.vue";
import OrderPackagingListView from "@/views/OrderPackaging/OrderPackagingListView.vue";
import OrderDetailView from "@/views/OrderPackaging/OrderDetailView.vue";
import ShipmentBarCodePrintView from "@/views/ProcessingShipment/ShipmentBarCodePrintView.vue";
import WarehouseOrderPickUpView from "@/views/WarehouseOrders/WarehouseOrderPickUpView.vue";
import WarehouseOrderSortingView from "@/views/WarehouseOrders/WarehouseOrderSortingView.vue";
import WarehouseOrderFactorPrintView from "@/views/WarehouseOrders/WarehouseOrderFactorPrintView.vue";
import PrintShipmentView from "@/views/RetailShipment/PrintShipmentView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        name: 'خانه'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/categories', // Category routes
      meta: {
        name: 'دسته‌بندی'
      },
      children: [{
          path: 'index',
          name: 'categories',
          component: CategoryView,
          meta: {
            name: 'لیست دسته‌یندی‌ها'
          }
        },
        {
          path: 'create',
          name: 'addCategories',
          component: AddCategoryView,
          meta: {
            name: 'ساخت دسته‌یندی‌'
          }
        },
        {
          path: 'edit/:id',
          name: 'editCategory',
          component: EditCategoryView,
          meta: {
            name: 'ویرایش دسته‌بند'
          }
        }
      ],
    },
    {
      path: '/brand', // Brand routes
      meta: {
        name: ' برند‌ها'
      },
      children: [{
          path: 'index',
          name: 'brands',
          component: BrandsView,
          meta: {
            name: 'لیست برندها'
          }
        },
        {
          path: 'create',
          name: 'addBrand',
          component: AddBrandView,
          meta: {
            name: 'ساخت برند'
          }
        },
        {
          path: 'edit/:id',
          name: 'editBrand',
          component: EditBrandView,
          meta: {
            name: 'ویرایش برند'
          }
        }
      ],
    },
    {
      path: '/color', // Color routes
      meta: {
        name: 'رنگ‌ها'
      },
      children: [{
          path: 'index',
          name: 'colors',
          component: ColorsView,
          meta: {
            name: 'لیست رنگ ها'
          }
        },
        {
          path: 'create',
          name: 'addColor',
          component: AddColorView,
          meta: {
            name: 'ساخت رنگ'
          }
        },
        {
          path: 'edit/:id',
          name: 'editColor',
          component: EditColorView,
          meta: {
            name: 'ویرایش رنگ'
          }
        }
      ],
    },
    {
      path: '/attributes', // Attributes routes
      meta: {
        name: 'ویژگی ها'
      },
      children: [{
          path: 'index',
          name: 'attribute',
          component: AttributesView,
          meta: {
            name: 'لیست ویژگی ها'
          }
        },
        {
          path: 'create',
          name: 'addAttribute',
          component: AddAttributesView,
          meta: {
            name: 'ساخت ویژگی'
          }
        },
        {
          path: 'edit/:id',
          name: 'editAttribute',
          component: EditAttributeView,
          meta: {
            name: 'ویرایش ویژگی'
          }
        }
      ],
    },
    {
      path: '/exports', // Export routes
      meta: {
        name: 'گزارش‌ها'
      },
      children: [{
          path: 'index',
          name: 'exportPage',
          component: ExportView,
          meta: {
            name: 'لیست گزارش ها'
          }
        },
        {
          path: 'get/:id',
          name: 'getExport',
          component: GetExportView,
          meta: {
            name: 'گزارش'
          }
        }
      ],
    },
    {
      path: '/notifications', // Notification routes
      meta: {
        name: 'پیام ها'
      },
      children: [{
          path: 'index',
          name: 'notifications',
          component: NotificationsView,
          meta: {
            name: 'لیست پیام ها'
          }
        },
        {
          path: 'create',
          name: 'createNotifications',
          component: CreateNotificationsView,
          meta: {
            name: 'ساخت پیام'
          }
        },
        {
          path: 'get/:id',
          name: 'getNotifications',
          component: GetNotificationsView,
          meta: {
            name: 'پیام'
          }
        }
      ],
    },
    {
      path: '/product', // Product and SKU routes
      meta: {
        name: 'محصولات'
      },
      children: [{
          path: 'index',
          name: 'ProductView',
          component: ProductView,
          meta: {
            name: 'لیست محصولات'
          }
        },
        {
          path: 'create',
          name: 'AddProductView',
          component: AddProductView,
          meta: {
            name: 'ساخت محصول'
          }
        },
        {
          path: 'get/image/:objectId',
          name: 'uploadImageProduct',
          component: ProductUploadImageView,
          meta: {
            name: 'لیست تصاویر'
          }
        },
        {
          path: 'get/skugroups/index', //sku groups
          name: 'skuGroupList',
          component: SkuView,
          meta: {
            name: 'لیست گروه کالاها'
          }
        },
        {
          path: 'get/skugroups/update/:skuGroupId',
          name: 'productSkuGroupUpdate',
          component: SkuGroupEditView,
          meta: {
            name: 'ویرایش گروه کالا'
          }
        },
        {
          path: 'get/:productId/skugroups/index',
          name: 'productSkuGroupList',
          component: SkuView,
          meta: {
            name: 'لیست گروه کاهای محصول'
          }
        },


        {
          path: 'get/skugroups/image/:objectId',
          name: 'skuGroupUploadImage',
          component: SkuGroupUploadImageView,
          meta: {
            name: 'تصاویر'
          }
        },
        {
          path: 'get/skus/index', //skus
          name: 'skuList',
          component: SkuView,
          meta: {
            name: 'لیست کالاها'
          }
        },
        {
          path: 'get/sku/create',
          name: 'createSku',
          component: CreateSku,
          meta: {
            name: 'ایحاد کالا'
          }
        },
        {
          path: 'get/sku/image/:objectId',
          name: 'uploadImageSku',
          component: SkuUploadImageView,
          meta: {
            name: 'تصاویر'
          }
        },

        {
          path: 'get/skugroups/:skuGroupId/sku/index',
          name: 'groupSkuList',
          component: SkuView,
          meta: {
            name: 'لیست کالاهای گروه'
          }
        },
        {
          path: 'get/:productId/sku/index',
          name: 'productSkuList',
          component: SkuView,
          meta: {
            name: 'لیست کالاهای محصول'
          }
        },
        {
          path: 'sku/update/:skuId',
          name: 'SkuEditView',
          component: SkuEditView,
          meta: {
            name: 'ویرایش کالا'
          }
        },
        {
          path: 'create/sku/:productId',
          name: 'createProduct',
          component: CreateProductView,
          meta: {
            name: 'ساخت کالا'
          }
        },
        {
          path: 'get/:productId/skugroup/:skuGroupId/create/sku',
          name: 'createProductSkuGroup',
          component: CreateProductSkuGroup,
          meta: {
            name: 'ساخت گروه کالا'
          }
        },

        {
          path: 'edit/:id', //product
          name: 'EditProductView',
          component: EditProductView,
          meta: {
            name: 'ویرایش محصول'
          }
        },
      ],
    },
    {
      path: '/ticket', // Notification routes
      meta: {
        name: 'تیکت ها'
      },
      children: [{
          path: 'index',
          name: 'TicketList',
          component: TicketList,
          meta: {
            name: 'لیست تیکت ها'
          }
        },
        {
          path: 'create',
          name: 'createTicket',
          component: CreateNewTickets,
          meta: {
            name: 'ساخت تیکت'
          }
        }, {
          path: 'get/:ticketId',
          name: 'getTicket',
          component: GetTicketView,
          meta: {
            name: 'تیکت'
          }
        },
      ],
    },
    {
      path: '/chat', // chat routes
      name: 'chatPage',
      component: ChatView,
      meta: {
        name: 'پیام رسان'
      }
    },
    {
      path: '/admin', // admin routes
      meta: {
        name: 'ادمین'
      },
      children: [{
          path: 'index',
          name: 'AdminListView',
          component: AdminListView,
          meta: {
            name: 'لیست ادمین ها'
          }
        },
        {
          path: 'create',
          name: 'createAdmin',
          component: CreateAdminView,
          meta: {
            name: 'ساخت ادمین'
          }
        },
        {
          path: 'edit/:adminId',
          name: 'editAdmin',
          component: EditAdminView,
          meta: {
            name: 'ویرایش ادمین'
          }
        },
      ],
    },
    {
      path: '/user', // user routes
      meta: {
        name: 'کاربران'
      },
      children: [{
          path: 'index',
          name: 'UserListView',
          component: UserListView,
          meta: {
            name: 'لیست کاربران'
          }
        },
        {
          path: 'create',
          name: 'createUser',
          component: CreateUserView,
          meta: {
            name: 'ایحاد کاربر'
          }
        },
        {
          path: 'edit/:userId',
          name: 'editUser',
          component: EditUserView,
          meta: {
            name: 'ویرایش کاربر'
          }
        },
      ],
    },
    {
      path: '/permission', // permission routes
      meta: {
        name: 'دسترسی ها'
      },
      children: [{
        path: 'index',
        name: 'PermissionListView',
        component: PermissionListView,
        meta: {
          name: 'لیست دسترسی ها'
        }
      }, ],
    },
    {
      path: '/role-permission', // role-permission routes
      meta: {
        name: 'نقش ها'
      },
      children: [{
          path: 'index',
          name: 'RolePermissionListView',
          component: RolePermissionListView,
          meta: {
            name: 'لیست نقش ها'
          }
        },
        {
          path: 'create',
          name: 'CreateRolePermissionView',
          component: CreateRolePermissionView,
          meta: {
            name: 'ساخت نقش'
          }
        },
        {
          path: 'edit/:roleId',
          name: 'EditRolePermissionView',
          component: EditRolePermissionView,
          meta: {
            name: 'ویرایش نقش'
          }
        },
      ],
    },
    {
      path: '/warehouse', // Warehouse routes
      meta: {
        name: 'انبار ها'
      },
      children: [{
          path: 'index',
          name: 'WarehouseListView',
          component: WarehouseListView,
          meta: {
            name: 'لیست انبار ها'
          }
        },
        {
          path: 'create',
          name: 'CreateWarehouseView',
          component: CreateWarehouseView,
          meta: {
            name: 'ساخت انیار'
          }
        },
        {
          path: 'edit/:warehouseId',
          name: 'EditWarehouseView',
          component: EditWarehouseView,
          meta: {
            name: 'ویرایش انبار'
          }
        }, {
          path: 'special-capacity/:warehouseId',
          name: 'SpecialCapacityView',
          component: SpecialCapacityView,
          meta: {
            name: 'ظرقیت ویژه'
          }
        },
       


      ],
    },
    {
      path: '/driver-management',
      meta:{
        name:' انبار'
      },
      children: [
        {
          path: 'index',  
          name: 'DriverManagementView',
          component: DriverManagementView,
          meta:{
            name:'مدیریت رانندگان'
          }
        },
        {
          path: 'create',
          name: 'createDriver',
          component: AddDriverManagementView,
          meta: {
            name: 'افزودن راننده '
          }
        },
        {
          path: 'update/:driverId',
          name: 'editDriver',
          component: EditDriverManagementView,
          meta: {
            name: ' ویرایش اطلاعات راننده '
          }
        },
    ]
    },
    {
      path: '/Supplier', // Supplier routes
      meta: {
        name: 'تامین کننده ها'
      },
      children: [{
          path: 'index',
          name: 'SupplierListView',
          component: SupplierListView,
          meta: {
            name: 'لیست تامین کننده ها'
          }
        },
        {
          path: 'create',
          name: 'CreateSupplierView',
          component: CreateSupplierView,
          meta: {
            name: 'ساخت تامین کننده'
          }
        },
        {
          path: 'edit/:supplierId',
          name: 'EditSupplierView',
          component: EditSupplierView,
          meta: {
            name: 'ویرایش تامین کننده'
          }
        }

      ],
    },
    {
      path: '/seller', // Seller routes
      meta: {
        name: 'فروشندگان'
      },
      children: [{
          path: 'index',
          name: 'SellerListView',
          component: SellerListView,
          meta: {
            name: 'لیست فروشندگان'
          }
        },
        {
          path: 'create',
          name: 'CreateSellerView',
          component: CreateSellerView,
          meta: {
            name: 'ساخت فروشندگان'
          }
        },
        {
          path: 'create/natural-seller',
          name: 'CreateNaturalSellerView',
          component: CreateNaturalSellerView,
          meta: {
            name: 'ساخت فروشنده حقیقی'
          }
        },
        {
          path: 'create/legal-seller',
          name: 'CreateLegalSellerView',
          component: CreateLegalSellerView,
          meta: {
            name: 'ساخت فروشنده حقوقی'
          }
        },
        {
          path: 'edit/natural-seller/:sellerId',
          name: 'EditNaturalSellerView',
          component: EditNaturalSellerView,
          meta: {
            name: 'ویرایش فروشنده حقیقی'
          }
        },
        {
          path: 'edit/legal-seller/:sellerId',
          name: 'EditLegalSellerView',
          component: EditLegalSellerView,
          meta: {
            name: 'ویرایش فروشنده حقوقی'
          }
        },
        {
          path: ':sellerId/add/sku',
          name: 'AddSkuSellerView',
          component: AddSkuSellerView,
          meta: {
            name: 'اضافه کردن کالا به فروشنده'
          }
        },

        {
          path: 'sku/:sellerId/history/warehouse-inventory',
          name: 'WarehouseInventoryHistoryView',
          component: WarehouseInventoryHistoryView,
          meta: {
            name: 'اضافه کردن کالا به فروشنده'
          }
        },
        {
          path: 'sku/:sellerId/history/site-inventory/:skuId',
          name: 'SiteInventoryHistoryView',
          component: SiteInventoryHistoryView,
          meta: {
            name: 'اضافه کردن کالا به فروشنده'
          }
        },
        {
          path: 'sku/:sellerId/history/price/:skuId',
          name: 'PriceHistoryView',
          component: PriceHistoryView,
          meta: {
            name: 'اضافه کردن کالا به فروشنده'
          }
        },
        {
          path: ':sellerId/cross-dock/index/',
          name: 'CrossDockListView',
          component: CrossDockListView,
          meta: {
            name: 'فروشندگان'
          }
        },
        {
          path: ':sellerId/cross-dock/add/',
          name: 'AddCrossDockView',
          component: AddCrossDockView,
          meta: {
            name: 'فروشندگان'
          }
        },
      ],
    },
    {
      path: '/page', // Pages routes
      meta: {
        name: 'صفحه ها'
      },
      children: [{
          path: 'index',
          name: 'PageListing',
          component: PageListView,
          meta: {
            name: 'لیست صفحهات'
          }
        },
        {
          path: ':pageId/update/template',
          name: 'PageUpdateTemplate',
          component: UpdateTemplateView,
          meta: {
            name: 'ویرایش قالب'
          }
        },
        {
          path: ':pageId/update/seo',
          name: 'PageUpdateSeo',
          component: UpdateSeoView,
          meta: {
            name: 'ویرایش سئو'
          }
        },
        {
          path: ':pageId/update/content',
          name: 'PageUpdateContent',
          component: UpdateContentView,
          meta: {
            name: 'ویرایش محتوا'
          }
        },
        {
          path: ':pageId/update/image',
          name: 'PageUpdateImage',
          component: UpdateImagesView,
          meta: {
            name: 'ویرایش تصاویر'
          }
        },
        {
          path: ':pageId/sliders/index',
          name: 'pageSliders',
          component: PageSliderListView,
          meta: {
            name: 'لیست اسلایدر ها'
          }
        },
        {
          path: ':pageId/sliders/add',
          name: 'addPageSliders',
          component: AddPageSliderView,
          meta: {
            name: 'افزودن اسلایدر'
          }
        },
        {
          path: ':pageId/sliders/:sliderId/skus',
          name: 'SliderSkuList',
          component: SliderSkuList,
          meta: {
            name: 'لیست کالاها'
          }
        },
      ],
    },
    {
      path: '/menu', // Pages routes
      meta: {
        name: 'منو ها'
      },
      children: [{
          path: 'index',
          name: 'MenuList',
          component: MenuListView,
          meta: {
            name: ' لیست منو ها'
          }
        },
        {
          path: 'create',
          name: 'CreateMenu',
          component: AddMenuView,
          meta: {
            name: 'ساخت منو'
          }
        },
        {
          path: 'update/:menuId',
          name: 'UpdateMenu',
          component: EditMenuView,
          meta: {
            name: 'ویرایش منو'
          }
        },
        {
          path: ':menuId/add/image',
          name: 'AddImage',
          component: AddImageMenuView,
          meta: {
            name: 'منو ها'
          }
        },

      ],
    },
    {
      path: '/promotion-page', // Pages routes
      meta: {
        name: 'مارکتینگ'
      },
      children: [{
          path: 'index',
          name: 'PromotionPages',
          component: PromotionPagesListView,
          meta: {
            name: 'صفحات پروموشن '
          }
        },
        {
          path: 'create',
          name: 'CreatePromotionPageView',
          component: CreatePromotionPageView,
          meta: {
            name: 'ساخت پروموشن'
          }
        },
        {
          path: 'update/:promotionId',
          name: 'EditPromotionPage',
          component: EditPromotionPageView,
          meta: {
            name: 'ویرایش پروموشن'
          }
        },
        {
          path: ':promotionId/sku-group/add',
          name: 'PromotionPageAddSkuGroup',
          component: AddSkuGroupView,
          meta: {
            name: 'افزودن محصول'
          }
        },
      ],
    },
    {
      path: '/home-page', // Pages routes
      meta: {
        name: 'تنظیمات'
      },
      children: [{
          path: 'index',
          name: 'HomePageSections',
          component: HomePageSectionListView,
          meta: {
            name: 'صفحه اصلی'
          }
        },
        {
          path: ':sectionId/add/banner',
          name: 'HomePageBannerSection',
          component: HomePageBannerListView,
          meta: {
            name: 'مدیریت بنر ها'
          }
        },
        {
          path: ':sectionId/banner/ads',
          name: 'HomePageAdsBannerSection',
          component: HomePageAdsBannerView,
          meta: {
            name: 'مدیریت بنر ها'
          }
        },
        {
          path: ':sectionId/special-sales/index',
          name: 'HomePageSpecialSaleList',
          component: HomePageSpecialSaleListView,
          meta: {
            name: 'مدیریت تخفیف ویژه'
          }
        },

        {
          path: ':sectionId/special-sales/add',
          name: 'HomePageSpecialSaleAdd',
          component: HomePageSpecialAddView,
          meta: {
            name: 'اضافه کردن تخفیف ویژه'
          }
        },
        {
          path: ':sectionId/special-sales/:specialId/edit/',
          name: 'HomePageSpecialSaleEdit',
          component: HomePageSpecialEditView,
          meta: {
            name: 'اضافه کردن تخفیف ویژه'
          }
        },

        {
          path: ':sectionId/special-sales/:specialId/add/shps',
          name: 'HomePageSpecialSaleShpsAdd',
          component: HomePageSpecilaShpsAddView,
          meta: {
            name: 'اضافه کردن محصول'
          }
        },
        {
          path: ':sectionId/category/index',
          name: 'HomePageCategoryList',
          component: HomePageCategoryListView,
          meta: {
            name: 'لیست دسته بندی'
          }
        },
        {
          path: ':sectionId/partition-slider/index',
          name: 'HomePagePartitionSlider',
          component: HomePagePartitionSliderView,
          meta: {
            name: 'لیست دسته بندی'
          }
        },
        {
          path: ':sectionId/partition-slider/:partitionId/add/sku',
          name: 'HomePagePartitionSliderAddSku',
          component: HomePagePartitionSliderAddSkuView,
          meta: {
            name: 'اضافه کردن محصول'
          }
        },

        {
          path: ':sectionId/section-sku/index',
          name: 'HomePageSectionListForSku',
          component: HomePageSkuWithSectionView,
          meta: {
            name: 'اضافه کردن محصول'
          }
        },
        {
          path: ':sectionId/section-sku/:categoryId/add/sku',
          name: 'HomePageAddSkuToSection',
          component: HomePageAddSkuToSectionView,
          meta: {
            name: 'اضافه کردن محصول'
          }
        },


        {
          path: ':sectionId/brand/index',
          name: 'HomePageBrandList',
          component: HomePageBrandSectionView,
          meta: {
            name: 'لیست یرند ها'
          }
        },
        {
          path: ':sectionId/add/sku',
          name: 'HomePageAddSkuSection',
          component: HomePageAddSkuSectionView,
          meta: {
            name: 'لیست یرند ها'
          }
        },
        {
          path: ':sectionId/gift/add',
          name: 'HomePageGiftAddSkuSection',
          component: HomePageGiftSectionView,
          meta: {
            name: 'لیست یرند ها'
          }
        },
        {
          path: ':sectionId/blog/index',
          name: 'HomePageBlogList',
          component: HomePageBlogSectionView,
          meta: {
            name: 'لیست یرند ها'
          }
        },
      ],
    },

    {
      path: '/shipment-requests', // shipment request routes
      meta: {
        name: ' بازرگانی'
      },
      children: [{
        path: 'index',
        name: 'ShipmentRequests',
        component: ShipmentRequestsView,
        meta: {
          name: 'محموله های درخواستی '
        }
      }, ]
    },
    {
      path: '/factor', // Factor routes
      meta: {
        name: 'بازرگانی'
      },
      children: [{
          path: 'index',
          name: 'factorList',
          component: FactorListView,
          meta: {
            name: 'فاکتور'
          }
        },
        {
          path: 'create',
          name: 'createFactor',
          component: AddFactorView,
          meta: {
            name: 'ایحاد فاکتور'
          }
        },
        {
          path: 'edit/:id',
          name: 'editFactor',
          component: EditFactorView,
          meta: {
            name: 'ویرایش فاکتور'
          }
        },
        {
          path: 'details/:id',
          name: 'pricingList',
          component: PricingListView,
          meta: {
            name: 'فاکتور'
          }
        },
        {
          path: 'print/:id',
          name: 'PrintFactor',
          component: PrintFactorView,
          meta: {
            name: 'فاکتور'
          }
        },
      ],
    },

    {
      path: '/retail-shipment', // Retail shipment
      meta: {
        name: 'بازرگانی'
      },
      children: [{
          path: 'index',
          name: 'RetailShipmentListView',
          component: RetailShipmentListView,
          meta: {
            name: 'محموله های بازرگانی'
          }
        },
        {
          path: ':factorId/add/shps',
          name: 'AddShpsToRetailShipmentView',
          component: AddShpsToRetailShipmentView,
          meta: {
            name: 'محموله های بازرگانی'
          }
        },
        {
          path: ':retailId/edit/shps',
          name: 'EditShpsToRetailShipmentView',
          component: EditShpsToRetailShipmentView,
          meta: {
            name: 'محموله های بازرگانی'
          }
        },
        {
          path: ':shipmentId/print',
          name: 'PrintShipmentView',
          component: PrintShipmentView,
          meta: {
            name: 'محموله های بازرگانی'
          }
        },
      ],
    },

    {
      path: '/vehicle', // Vehicle routes
      meta: {
        name: 'خودرو'
      },
      children: [{
        path: 'index',
        name: 'VehicleList',
        component: VehicleListView,
        meta: {
          name: 'مدیریت خودروها'
        }
      }],
    },
    {
      path: '/processing-shipment', // processing shipment routes
      meta: {
        name: 'انبار'
      },
      children: [{
          path: 'index',
          name: 'ProcessingShipmentIndexView',
          component: ProcessingShipmentIndexView,
          meta: {
            name: 'پردازش محموله'
          }
        },
        {
          path: ':shipmentId/detail-print',
          name: 'ShipmentDetailPrintView',
          component: ShipmentDetailPrintView,
          meta: {
            name: 'پردازش محموله'
          }
        },
        {
          path: ':shipmentId/barcode-print',
          name: 'ShipmentBarCodePrintView',
          component: ShipmentBarCodePrintView,
          meta: {
            name: 'پردازش محموله'
          }
        },
        {
          path: ':shipmentId/shps-list',
          name: 'ProcessingShipmentShpsListView',
          component: ProcessingShipmentShpsListView,
          meta: {
            name: 'پردازش محموله'
          }
        }
      ],
    },

    {
      path: '/package', // Packages Managment routes
      meta: {
        name: 'انبار'
      },
      children: [{
          path: 'index',
          name: 'PackageList',
          component: PackageListView,
          meta: {
            name: 'مدیریت بسته‌ها'
          }
        },
        {
          path: 'history/:packageId',
          name: 'PackageHistory',
          component: PackageHistoryView,
          meta: {
            name: 'مدیریت بسته‌ها'
          }
        }
      ],
    },

    {
      path: '/active-package', // Active package routes
      meta: {
        name: 'انبار'
      },
      children: [{
        path: 'index',
        name: 'ActivePackageList',
        component: ActivePackageListView,
        meta: {
          name: 'بسته های فعال'
        }
      }],
    },

    {
      path: '/cargo-management', // Vehicle routes
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'CargoListingView',
          component: CargoListingView,
          meta: {
            name: 'مدیریت کارگو'
          }
        },
        {
          path: ':cargoId/package',
          name: 'CargoPackageView',
          component: CargoPackageView,
          meta: {
            name: 'پردازش محموله'
          }
        },
        {
          path: ':cargoId/print',
          name: 'CargoPrintView',
          component: CargoPrintView,
          meta: {
            name: 'پردازش محموله'
          }
        },

      ],
    },
    {
      path: '/cargo-receiving', // Cargo receiving
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'CargoReceivingListView',
          component: CargoReceivingListView,
          meta: {
            name: 'دریافت محموله'
          }
        },
      ],
    },

    {
      path: '/placement', // Placemenet routes
      meta: {
        name: 'انبار'
      },
      children: [{
          path: 'index',
          name: 'PlacementList',
          component: PlacementListView,
          meta: {
            name: 'مدیریت جایگذاری'
          }
        },
        {
          path: ':placementId/shpss',
          name: 'PlacementShpss',
          component: PlacementShpssListView,
          meta: {
            name: 'مدیریت جایگذاری'
          }
        }
      ],
    },

    {
      path: '/package-placement', // Package placement routes
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'PackagePlacementListView',
          component: PackagePlacementListView,
          meta: {
            name: 'جایگذاری بسته'
          }
        },
      ],
    },

    {
      path: '/locating', // Locating routes
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'PackagePlacementScanView',
          component: PackagePlacementScanView,
          meta: {
            name: 'جایگذاری بسته'
          }
        },
        {
          path: ':packageId/shps-list',
          name: 'ShpsLocationView',
          component: ShpsLocationView,
          meta: {
            name: 'جایگذاری بسته'
          }
        },
        {
          path: ':packageId/shps-list/locating-shelf/:placementId',
          name: 'ShpsListLocatingToShelfView',
          component: ShpsListLocatingToShelfView,
          meta: {
            name: 'جایگذاری بسته'
          }
        },
        {
          path: 'dashboard',
          name: 'LocatingDashboardView',
          component: LocatingDashboardView,
          meta: {
            name: 'جایگذاری بسته'
          }
        },
      ],
    },

    {
      path: '/warehouse-inventory', // Warehouse inventory routes
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'WarehouseInventoryListView',
          component: WarehouseInventoryListView,
          meta: {
            name: 'موجودی انبار'
          }
        },
      ],
    },

    {
      path: '/report', // Waste and lost routes
      meta: {
        name: 'انبار'
      },
      children: [
        {
          path: 'index',
          name: 'WasteAndLostListView',
          component: WasteAndLostListView,
          meta: {
            name: 'مفقودی و ضایعات'
          }
        },
        {
          path: 'create',
          name: 'AddWasteAndLostView',
          component: AddWasteAndLostView,
          meta: {
            name: 'مفقودی و ضایعات'
          }
        },
      ],
    },
    {
      path: '/print-label-bulk', // print label bulk
      meta: {
        name: 'انبار'
      },
      children: [{
        path: 'index',
        name: 'printLabelBulk',
        component: BulkLabelPrintListView,
        meta: {
          name: ' پرینت گروهی برچسب '
        }
      },
    ],
    },
    {
      path: '/order-packaging', // order packaging
      meta: {
        name: 'انبار'
      },
      children: [{
        path: 'index',
        name: 'order-packaging',
        component: OrderPackagingListView,
        meta: {
          name: ' بسته بندی سفارش ها '
        }
      },
      {
        path: 'detail-info',
        name: 'detail-info',
        component: OrderDetailView,
        meta: {
          name: ' بسته بندی سفارش ها'
        }
      }],
    },
    {

      path: '/warehouse-orders', // print label bulk
      meta: {
        name: 'انبار'
      },
      children: [
         {
          path: 'index',
          name: 'WarehouseOrderListView',
          component: WarehouseOrderListView,
          meta: {
            name: 'سفارش ها'
          }
        },
        {
          path: ':orderId/print',
          name: 'WarehouseOrderFactorPrintView',
          component: WarehouseOrderFactorPrintView,
          meta: {
            name: 'سفارش ها'
          }
        },
        {
          path: 'pick-up',
          name: 'WarehouseOrderPickUpView',
          component: WarehouseOrderPickUpView,
          meta: {
            name: 'سفارش ها'
          }
        },
        {
          path: 'sorting',
          name: 'WarehouseOrderSortingView',
          component: WarehouseOrderSortingView,
          meta: {
            name: 'سفارش ها'
          }
        },

        // {
        //   path: 'print-factor',
        //   name: 'WarehouseOrderListView',
        //   component: WarehouseOrderListView,
        //   meta: {
        //     name: 'سفارش ها'
        //   }
        // }
      ],
    },
    {
      path: '/orders', // Order route
      meta: {
        name: 'سفارش ها'
      },
      children: [
        {
          path: 'index',
          name: 'OrderList',
          component: OrderListView,
          meta: {
            name: 'لیست سفارش ها'
          }
        },
        {
          path: 'user/:id/edit',
          name: 'orderEditUser',
          component: orderEditUser,
          meta: {
            name: 'لیست سفارش ها'
          }
        },
      ],
    },
  ]
})
const privateRoutes = [
  'home',
  'categories',
  'addCategories',
  'editCategory',
  //brands
  'brands',
  'addBrand',
  'editBrand',
  //Color
  'colors',
  'addColor',
  'editColor',
  //attribute
  'attribute',
  'addAttribute',
  'editAttribute',
  //Export
  'exportPage',
  'getExport',
  //notifications
  'notifications',
  'createNotifications',
  //product
  'createProduct',
  'ProductView',
  'AddProductView',
  'uploadImageProduct',
  'skuGroupList',
  'productSkuGroupList',
  'skuGroupUploadImage',
  'skuList',
  'createSku',
  'uploadImageSku',
  'groupSkuList',
  'productSkuList',
  'SkuEditView',
  'createProduct',
  'createProductSkuGroup',
  'EditProductView',
  //Ticket
  'TicketList',
  'createTicket',
  'getTicket',
  //chat
  'chatPage',
  //Admin
  'AdminListView',
  'createAdmin',
  'editAdmin',
  'UserListView',
  'createUser',
  'editUser',
  //Permissions
  'PermissionListView',
  'RolePermissionListView',
  'CreateRolePermissionView',
  'EditRolePermissionView',
  //Warehouse
  'WarehouseListView',
  'CreateWarehouseView',
  'EditWarehouseView',
  'SpecialCapacityView',
  //Supplier
  'SupplierListView',
  'CreateSupplierView',
  'EditSupplierView',
  //Seller
  'SellerListView',
  'CreateSellerView',
  'CreateNaturalSellerView',
  'CreateLegalSellerView',
  'EditNaturalSellerView',
  'EditLegalSellerView',
  'AddSkuSellerView',
];
router.beforeEach((to, from, next) => {
  if (privateRoutes.includes(to.name)) {
    // redirect to login page with next url
    let decodedCookie = decodeURIComponent(document.cookie);
    let str = decodedCookie.split('; ');
    const result = {};
    for (let i in str) {
      const cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }
    if (!result.adminToken) {
      next('/login');
    }

  }

  // // redirect to dashboard page if user is already logged in
  // if (to.name === 'login') {
  //   if (localStorage.getItem('accessToken')) {
  //     next('/dashboard');
  //   }
  // }

  next();
});
export default router