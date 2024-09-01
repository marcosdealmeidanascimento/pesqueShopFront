import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Toast from "primevue/toast";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import MultiSelect from "primevue/multiselect";
import Fieldset from "primevue/fieldset";
import Chip from "primevue/chip";
import InputSwitch from "primevue/inputswitch";
import Calendar from "primevue/calendar";
import InputNumber from "primevue/inputnumber";
import Badge from "primevue/badge";
import FileUpload from "primevue/fileupload";
import Image from "primevue/image";
import InputMask from "primevue/inputmask";
import Avatar from "primevue/avatar";
import InputOtp from "primevue/inputotp";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
import Stepper from "primevue/stepper";
import StepperPanel from "primevue/stepperpanel";
import FloatLabel from "primevue/floatlabel";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import TabMenu from "primevue/tabmenu";
import Toolbar from "primevue/toolbar";
import ConfirmDialog from "primevue/confirmdialog";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Panel from "primevue/panel";

interface Components {
  [key: string]:
    | typeof Panel
    | typeof TabPanel
    | typeof TabView
    | typeof ConfirmDialog
    | typeof Toolbar
    | typeof TabMenu
    | typeof InputGroup
    | typeof InputGroupAddon
    | typeof FloatLabel
    | typeof Stepper
    | typeof StepperPanel
    | typeof PanelMenu
    | typeof Sidebar
    | typeof InputOtp
    | typeof Avatar
    | typeof InputMask
    | typeof Image
    | typeof FileUpload
    | typeof Badge
    | typeof Password
    | typeof Button
    | typeof DataTable
    | typeof Column
    | typeof InputText
    | typeof Textarea
    | typeof Dropdown
    | typeof Toast
    | typeof Checkbox
    | typeof Dialog
    | typeof Menubar
    | typeof Card
    | typeof MultiSelect
    | typeof Fieldset
    | typeof Chip
    | typeof InputSwitch
    | typeof Calendar
    | typeof InputNumber;
}

const primevueconfig = {
  components: {
    Panel,

    TabPanel,

    TabView,

    ConfirmDialog,

    Toolbar,

    TabMenu,

    InputGroup,

    InputGroupAddon,

    FloatLabel,

    Stepper,

    StepperPanel,

    PanelMenu,

    Sidebar,

    InputOtp,

    Avatar,

    InputMask,

    Image,

    FileUpload,

    Badge,

    Password,

    Button,

    DataTable,

    Column,

    InputText,

    Textarea,

    Dropdown,

    Toast,

    Checkbox,

    Dialog,

    Menubar,

    Card,

    MultiSelect,

    Fieldset,

    Chip,

    InputSwitch,

    Calendar,

    InputNumber,
  } as Components,
};

export default primevueconfig;
