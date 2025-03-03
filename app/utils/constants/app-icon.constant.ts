import { AiOutlineAppstore, AiOutlineFilePdf, AiOutlineFileText, AiOutlineReload } from 'react-icons/ai'
import { BiBarChart, BiCog, BiMessageDetail, BiSortAlt2, BiUserCircle } from 'react-icons/bi'
import { BsQuestionCircle } from 'react-icons/bs'
import { FaCircle, FaFacebook, FaHeart, FaPlayCircle } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import {
  FiAirplay,
  FiArrowLeft,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiEdit2,
  FiEye,
  FiFile,
  FiFilter,
  FiHeart,
  FiInfo,
  FiList,
  FiLogOut,
  FiMail,
  FiMenu,
  FiMinus,
  FiMoreVertical,
  FiPhone,
  FiPlus,
  FiSearch,
  FiSettings,
  FiShoppingCart,
  FiTrash,
  FiUser,
  FiUsers,
  FiVideo,
  FiX,
} from 'react-icons/fi'
import { IoCaretDown, IoCaretUp, IoStarSharp } from 'react-icons/io5'
import { MdAttachMoney, MdOutlineTopic } from 'react-icons/md'
import { RiBankCardFill } from 'react-icons/ri'
import { SiMicrosoftexcel } from 'react-icons/si'

const AppIcon = {
  x: FiX,
  add: FiPlus,
  edit: FiEdit2,
  view: FiEye,
  info: FiInfo,
  setPermission: BiCog,
  delete: FiTrash,
  deactive: FiTrash,
  reactivate: FiTrash,
  video: FiVideo,
  article: FiFile,
  search: FiSearch,
  sortUp: IoCaretUp,
  sortDown: IoCaretDown,
  play: FaPlayCircle,
  back: FiArrowLeft,
  sort: BiSortAlt2,

  menu: FiMenu,
  none: FiMinus,
  check: FiCheck,
  circle: FaCircle,
  download: FiDownload,
  quiz: BsQuestionCircle,
  rating: IoStarSharp,
  arrowRight: FiChevronRight,
  arrowLeft: FiChevronLeft,
  filter: FiFilter,
  moreVertical: FiMoreVertical,
  cart: FiShoppingCart,
  clock: FiClock,
  favoriteFilled: FaHeart,
  favoriteOutline: FiHeart,
  skip: AiOutlineReload,
  bank: RiBankCardFill,
  catalog: FiList,

  communication: BiMessageDetail,
  performance: BiBarChart,
  settings: FiSettings,

  facebook: FaFacebook,
  google: FcGoogle,

  course: FiAirplay,
  users: FiUsers,
  user: FiUser,
  mail: FiMail,
  phone: FiPhone,
  money: MdAttachMoney,
  payment: FiCreditCard,
  excel: SiMicrosoftexcel,
  pdf: AiOutlineFilePdf,
  lesson: AiOutlineFileText,
  lecture: MdOutlineTopic,
  userBi: BiUserCircle,
  withlist: AiOutlineAppstore,
  logout: FiLogOut,
}

export default AppIcon
