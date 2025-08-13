import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { decryptPayload } from "../../utils/Payload";
import { HandleGoogleLogin } from "../../features/firebase";
// Country data with flags, names, and codes
const countries = [
  { code: "CV", name: "Cape Verde", dialCode: "00238", flag: "🇨🇻" },
  { code: "AD", name: "Andorra", dialCode: "00376", flag: "🇦🇩" },
  { code: "AE", name: "United Arab Emirates", dialCode: "00971", flag: "🇦🇪" },
  { code: "AF", name: "Afghanistan", dialCode: "0093", flag: "🇦🇫" },
  { code: "AG", name: "Antigua and Barbuda", dialCode: "001268", flag: "🇦🇬" },
  { code: "AI", name: "Anguilla", dialCode: "001264", flag: "🇦🇮" },
  { code: "AL", name: "Albania", dialCode: "00355", flag: "🇦🇱" },
  { code: "AM", name: "Armenia", dialCode: "00374", flag: "🇦🇲" },
  { code: "AO", name: "Angola", dialCode: "00244", flag: "🇦🇴" },
  { code: "AQ", name: "Antarctica", dialCode: "00672", flag: "🇦🇶" },
  { code: "AR", name: "Argentina", dialCode: "0054", flag: "🇦🇷" },
  { code: "AS", name: "American Samoa", dialCode: "001684", flag: "🇦🇸" },
  { code: "AT", name: "Austria", dialCode: "0043", flag: "🇦🇹" },
  { code: "AU", name: "Australia", dialCode: "0061", flag: "🇦🇺" },
  { code: "AW", name: "Aruba", dialCode: "00297", flag: "🇦🇼" },
  { code: "AX", name: "Åland Islands", dialCode: "00358", flag: "🇦🇽" },
  { code: "AZ", name: "Azerbaijan", dialCode: "00994", flag: "🇦🇿" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "00387", flag: "🇧🇦" },
  { code: "BB", name: "Barbados", dialCode: "001246", flag: "🇧🇧" },
  { code: "BD", name: "Bangladesh", dialCode: "00880", flag: "🇧🇩" },
  { code: "BE", name: "Belgium", dialCode: "0032", flag: "🇧🇪" },
  { code: "BF", name: "Burkina Faso", dialCode: "00226", flag: "🇧🇫" },
  { code: "BG", name: "Bulgaria", dialCode: "00359", flag: "🇧🇬" },
  { code: "BH", name: "Bahrain", dialCode: "00973", flag: "🇧🇭" },
  { code: "BI", name: "Burundi", dialCode: "00257", flag: "🇧🇮" },
  { code: "BJ", name: "Benin", dialCode: "00229", flag: "🇧🇯" },
  { code: "BL", name: "Saint Barthélemy", dialCode: "00590", flag: "🇧🇱" },
  { code: "BM", name: "Bermuda", dialCode: "001441", flag: "🇧🇲" },
  { code: "BN", name: "Brunei", dialCode: "00673", flag: "🇧🇳" },
  { code: "BO", name: "Bolivia", dialCode: "00591", flag: "🇧🇴" },
  { code: "BQ", name: "Caribbean Netherlands", dialCode: "00599", flag: "🇧🇶" },
  { code: "BR", name: "Brazil", dialCode: "0055", flag: "🇧🇷" },
  { code: "BS", name: "Bahamas", dialCode: "001242", flag: "🇧🇸" },
  { code: "BT", name: "Bhutan", dialCode: "00975", flag: "🇧🇹" },
  { code: "BV", name: "Bouvet Island", dialCode: "0047", flag: "🇧🇻" },
  { code: "BW", name: "Botswana", dialCode: "00267", flag: "🇧🇼" },
  { code: "BY", name: "Belarus", dialCode: "00375", flag: "🇧🇾" },
  { code: "BZ", name: "Belize", dialCode: "00501", flag: "🇧🇿" },
  { code: "CA", name: "Canada", dialCode: "001", flag: "🇨🇦" },
  { code: "CC", name: "Cocos (Keeling) Islands", dialCode: "0061", flag: "🇨🇨" },
  {
    code: "CD",
    name: "Democratic Republic of the Congo",
    dialCode: "00243",
    flag: "🇨🇩",
  },
  {
    code: "CF",
    name: "Central African Republic",
    dialCode: "00236",
    flag: "🇨🇫",
  },
  { code: "CG", name: "Republic of the Congo", dialCode: "00242", flag: "🇨🇬" },
  { code: "CH", name: "Switzerland", dialCode: "0041", flag: "🇨🇭" },
  { code: "CI", name: "Côte d'Ivoire", dialCode: "00225", flag: "🇨🇮" },
  { code: "CK", name: "Cook Islands", dialCode: "00682", flag: "🇨🇰" },
  { code: "CL", name: "Chile", dialCode: "0056", flag: "🇨🇱" },
  { code: "CM", name: "Cameroon", dialCode: "00237", flag: "🇨🇲" },
  { code: "CN", name: "China", dialCode: "0086", flag: "🇨🇳" },
  { code: "CO", name: "Colombia", dialCode: "0057", flag: "🇨🇴" },
  { code: "CR", name: "Costa Rica", dialCode: "00506", flag: "🇨🇷" },
  { code: "CU", name: "Cuba", dialCode: "0053", flag: "🇨🇺" },

  { code: "CW", name: "Curaçao", dialCode: "00599", flag: "🇨🇼" },
  { code: "CX", name: "Christmas Island", dialCode: "0061", flag: "🇨🇽" },
  { code: "CY", name: "Cyprus", dialCode: "00357", flag: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", dialCode: "00420", flag: "🇨🇿" },
  { code: "DE", name: "Germany", dialCode: "0049", flag: "🇩🇪" },
  { code: "DJ", name: "Djibouti", dialCode: "00253", flag: "🇩🇯" },
  { code: "DK", name: "Denmark", dialCode: "0045", flag: "🇩🇰" },
  { code: "DM", name: "Dominica", dialCode: "001767", flag: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", dialCode: "001809", flag: "🇩🇴" },
  { code: "DZ", name: "Algeria", dialCode: "00213", flag: "🇩🇿" },
  { code: "EC", name: "Ecuador", dialCode: "00593", flag: "🇪🇨" },
  { code: "EE", name: "Estonia", dialCode: "00372", flag: "🇪🇪" },
  { code: "EG", name: "Egypt", dialCode: "0020", flag: "🇪🇬" },
  { code: "EH", name: "Western Sahara", dialCode: "00212", flag: "🇪🇭" },
  { code: "ER", name: "Eritrea", dialCode: "00291", flag: "🇪🇷" },
  { code: "ES", name: "Spain", dialCode: "0034", flag: "🇪🇸" },
  { code: "ET", name: "Ethiopia", dialCode: "00251", flag: "🇪🇹" },
  { code: "FI", name: "Finland", dialCode: "00358", flag: "🇫🇮" },
  { code: "FJ", name: "Fiji", dialCode: "00679", flag: "🇫🇯" },
  { code: "FK", name: "Falkland Islands", dialCode: "00500", flag: "🇫🇰" },
  { code: "FM", name: "Micronesia", dialCode: "00691", flag: "🇫🇲" },
  { code: "FO", name: "Faroe Islands", dialCode: "00298", flag: "🇫🇴" },
  { code: "FR", name: "France", dialCode: "0033", flag: "🇫🇷" },
  { code: "GA", name: "Gabon", dialCode: "00241", flag: "🇬🇦" },
  { code: "GB", name: "United Kingdom", dialCode: "0044", flag: "🇬🇧" },
  { code: "GD", name: "Grenada", dialCode: "001473", flag: "🇬🇩" },
  { code: "GE", name: "Georgia", dialCode: "00995", flag: "🇬🇪" },
  { code: "GF", name: "French Guiana", dialCode: "00594", flag: "🇬🇫" },
  { code: "GG", name: "Guernsey", dialCode: "0044", flag: "🇬🇬" },
  { code: "GH", name: "Ghana", dialCode: "00233", flag: "🇬🇭" },
  { code: "GI", name: "Gibraltar", dialCode: "00350", flag: "🇬🇮" },
  { code: "GL", name: "Greenland", dialCode: "00299", flag: "🇬🇱" },
  { code: "GM", name: "Gambia", dialCode: "00220", flag: "🇬🇲" },
  { code: "GN", name: "Guinea", dialCode: "00224", flag: "🇬🇳" },
  { code: "GP", name: "Guadeloupe", dialCode: "00590", flag: "🇬🇵" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "00240", flag: "🇬🇶" },
  { code: "GR", name: "Greece", dialCode: "0030", flag: "🇬🇷" },
  {
    code: "GS",
    name: "South Georgia and the South Sandwich Islands",
    dialCode: "00500",
    flag: "🇬🇸",
  },
  { code: "GT", name: "Guatemala", dialCode: "00502", flag: "🇬🇹" },
  { code: "GU", name: "Guam", dialCode: "001671", flag: "🇬🇺" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "00245", flag: "🇬🇼" },
  { code: "GY", name: "Guyana", dialCode: "00592", flag: "🇬🇾" },
  { code: "HK", name: "Hong Kong", dialCode: "00852", flag: "🇭🇰" },
  {
    code: "HM",
    name: "Heard Island and McDonald Islands",
    dialCode: "0061",
    flag: "🇭🇲",
  },
  { code: "HN", name: "Honduras", dialCode: "00504", flag: "🇭🇳" },
  { code: "HR", name: "Croatia", dialCode: "00385", flag: "🇭🇷" },
  { code: "HT", name: "Haiti", dialCode: "00509", flag: "🇭🇹" },
  { code: "HU", name: "Hungary", dialCode: "0036", flag: "🇭🇺" },
  { code: "ID", name: "Indonesia", dialCode: "0062", flag: "🇮🇩" },
  { code: "IE", name: "Ireland", dialCode: "00353", flag: "🇮🇪" },
  { code: "IL", name: "Israel", dialCode: "00972", flag: "🇮🇱" },
  { code: "IM", name: "Isle of Man", dialCode: "0044", flag: "🇮🇲" },
  { code: "IN", name: "India", dialCode: "0091", flag: "🇮🇳" },
  {
    code: "IO",
    name: "British Indian Ocean Territory",
    dialCode: "00246",
    flag: "🇮🇴",
  },
  { code: "IQ", name: "Iraq", dialCode: "00964", flag: "🇮🇶" },
  { code: "IR", name: "Iran", dialCode: "0098", flag: "🇮🇷" },
  { code: "IS", name: "Iceland", dialCode: "00354", flag: "🇮🇸" },
  { code: "IT", name: "Italy", dialCode: "0039", flag: "🇮🇹" },
  { code: "JE", name: "Jersey", dialCode: "0044", flag: "🇯🇪" },
  { code: "JM", name: "Jamaica", dialCode: "001876", flag: "🇯🇲" },
  { code: "JO", name: "Jordan", dialCode: "00962", flag: "🇯🇴" },
  { code: "JP", name: "Japan", dialCode: "0081", flag: "🇯🇵" },
  { code: "KE", name: "Kenya", dialCode: "00254", flag: "🇰🇪" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "00996", flag: "🇰🇬" },
  { code: "KH", name: "Cambodia", dialCode: "00855", flag: "🇰🇭" },
  { code: "KI", name: "Kiribati", dialCode: "00686", flag: "🇰🇮" },
  { code: "KM", name: "Comoros", dialCode: "00269", flag: "🇰🇲" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "001869", flag: "🇰🇳" },
  { code: "KP", name: "North Korea", dialCode: "00850", flag: "🇰🇵" },
  { code: "KR", name: "South Korea", dialCode: "0082", flag: "🇰🇷" },
  { code: "KW", name: "Kuwait", dialCode: "00965", flag: "🇰🇼" },
  { code: "KY", name: "Cayman Islands", dialCode: "001345", flag: "🇰🇾" },
  { code: "KZ", name: "Kazakhstan", dialCode: "007", flag: "🇰🇿" },
  { code: "LA", name: "Laos", dialCode: "00856", flag: "🇱🇦" },
  { code: "LB", name: "Lebanon", dialCode: "00961", flag: "🇱🇧" },
  { code: "LC", name: "Saint Lucia", dialCode: "001758", flag: "🇱🇨" },
  { code: "LI", name: "Liechtenstein", dialCode: "00423", flag: "🇱🇮" },
  { code: "LK", name: "Sri Lanka", dialCode: "0094", flag: "🇱🇰" },
  { code: "LR", name: "Liberia", dialCode: "00231", flag: "🇱🇷" },
  { code: "LS", name: "Lesotho", dialCode: "00266", flag: "🇱🇸" },
  { code: "LT", name: "Lithuania", dialCode: "00370", flag: "🇱🇹" },
  { code: "LU", name: "Luxembourg", dialCode: "00352", flag: "🇱🇺" },
  { code: "LV", name: "Latvia", dialCode: "00371", flag: "🇱🇻" },
  { code: "LY", name: "Libya", dialCode: "00218", flag: "🇱🇾" },
  { code: "MA", name: "Morocco", dialCode: "00212", flag: "🇲🇦" },
  { code: "MC", name: "Monaco", dialCode: "00377", flag: "🇲🇨" },
  { code: "MD", name: "Moldova", dialCode: "00373", flag: "🇲🇩" },
  { code: "ME", name: "Montenegro", dialCode: "00382", flag: "🇲🇪" },
  { code: "MF", name: "Saint Martin", dialCode: "00590", flag: "🇲🇫" },
  { code: "MG", name: "Madagascar", dialCode: "00261", flag: "🇲🇬" },
  { code: "MH", name: "Marshall Islands", dialCode: "00692", flag: "🇲🇭" },
  { code: "MK", name: "North Macedonia", dialCode: "00389", flag: "🇲🇰" },
  { code: "ML", name: "Mali", dialCode: "00223", flag: "🇲🇱" },
  { code: "MM", name: "Myanmar", dialCode: "0095", flag: "🇲🇲" },
  { code: "MN", name: "Mongolia", dialCode: "00976", flag: "🇲🇳" },
  { code: "MO", name: "Macao", dialCode: "00853", flag: "🇲🇴" },
  {
    code: "MP",
    name: "Northern Mariana Islands",
    dialCode: "001670",
    flag: "🇲🇵",
  },
  { code: "MQ", name: "Martinique", dialCode: "00596", flag: "🇲🇶" },
  { code: "MR", name: "Mauritania", dialCode: "00222", flag: "🇲🇷" },
  { code: "MS", name: "Montserrat", dialCode: "001664", flag: "🇲🇸" },
  { code: "MT", name: "Malta", dialCode: "00356", flag: "🇲🇹" },
  { code: "MU", name: "Mauritius", dialCode: "00230", flag: "🇲🇺" },
  { code: "MV", name: "Maldives", dialCode: "00960", flag: "🇲🇻" },
  { code: "MW", name: "Malawi", dialCode: "00265", flag: "🇲🇼" },
  { code: "MX", name: "Mexico", dialCode: "0052", flag: "🇲🇽" },
  { code: "MY", name: "Malaysia", dialCode: "0060", flag: "🇲🇾" },
  { code: "MZ", name: "Mozambique", dialCode: "00258", flag: "🇲🇿" },
  { code: "NA", name: "Namibia", dialCode: "00264", flag: "🇳🇦" },
  { code: "NC", name: "New Caledonia", dialCode: "00687", flag: "🇳🇨" },
  { code: "NE", name: "Niger", dialCode: "00227", flag: "🇳🇪" },
  { code: "NF", name: "Norfolk Island", dialCode: "00672", flag: "🇳🇫" },
  { code: "NG", name: "Nigeria", dialCode: "00234", flag: "🇳🇬" },
  { code: "NI", name: "Nicaragua", dialCode: "00505", flag: "🇳🇮" },
  { code: "NL", name: "Netherlands", dialCode: "0031", flag: "🇳🇱" },
  { code: "NO", name: "Norway", dialCode: "0047", flag: "🇳🇴" },
  { code: "NP", name: "Nepal", dialCode: "00977", flag: "🇳🇵" },
  { code: "NR", name: "Nauru", dialCode: "00674", flag: "🇳🇷" },
  { code: "NU", name: "Niue", dialCode: "00683", flag: "🇳🇺" },
  { code: "NZ", name: "New Zealand", dialCode: "0064", flag: "🇳🇿" },
  { code: "OM", name: "Oman", dialCode: "00968", flag: "🇴🇲" },
  { code: "PA", name: "Panama", dialCode: "00507", flag: "🇵🇦" },
  { code: "PE", name: "Peru", dialCode: "0051", flag: "🇵🇪" },
  { code: "PF", name: "French Polynesia", dialCode: "00689", flag: "🇵🇫" },
  { code: "PG", name: "Papua New Guinea", dialCode: "00675", flag: "🇵🇬" },
  { code: "PH", name: "Philippines", dialCode: "0063", flag: "🇵🇭" },
  { code: "PK", name: "Pakistan", dialCode: "0092", flag: "🇵🇰" },
  { code: "PL", name: "Poland", dialCode: "0048", flag: "🇵🇱" },
  {
    code: "PM",
    name: "Saint Pierre and Miquelon",
    dialCode: "00508",
    flag: "🇵🇲",
  },
  { code: "PN", name: "Pitcairn", dialCode: "00870", flag: "🇵🇳" },
  { code: "PR", name: "Puerto Rico", dialCode: "001787", flag: "🇵🇷" },
  { code: "PS", name: "Palestine", dialCode: "00970", flag: "🇵🇸" },
  { code: "PT", name: "Portugal", dialCode: "00351", flag: "🇵🇹" },
  { code: "PW", name: "Palau", dialCode: "00680", flag: "🇵🇼" },
  { code: "PY", name: "Paraguay", dialCode: "00595", flag: "🇵🇾" },
  { code: "QA", name: "Qatar", dialCode: "00974", flag: "🇶🇦" },
  { code: "RE", name: "Réunion", dialCode: "00262", flag: "🇷🇪" },
  { code: "RO", name: "Romania", dialCode: "0040", flag: "🇷🇴" },
  { code: "RS", name: "Serbia", dialCode: "00381", flag: "🇷🇸" },
  { code: "RU", name: "Russia", dialCode: "007", flag: "🇷🇺" },
  { code: "RW", name: "Rwanda", dialCode: "00250", flag: "🇷🇼" },
  { code: "SA", name: "Saudi Arabia", dialCode: "00966", flag: "🇸🇦" },
  { code: "SB", name: "Solomon Islands", dialCode: "00677", flag: "🇸🇧" },
  { code: "SC", name: "Seychelles", dialCode: "00248", flag: "🇸🇨" },
  { code: "SD", name: "Sudan", dialCode: "00249", flag: "🇸🇩" },
  { code: "SE", name: "Sweden", dialCode: "0046", flag: "🇸🇪" },
  { code: "SG", name: "Singapore", dialCode: "0065", flag: "🇸🇬" },
  { code: "SH", name: "Saint Helena", dialCode: "00290", flag: "🇸🇭" },
  { code: "SI", name: "Slovenia", dialCode: "00386", flag: "🇸🇮" },
  { code: "SJ", name: "Svalbard and Jan Mayen", dialCode: "0047", flag: "🇸🇯" },
  { code: "SK", name: "Slovakia", dialCode: "00421", flag: "🇸🇰" },
  { code: "SL", name: "Sierra Leone", dialCode: "00232", flag: "🇸🇱" },
  { code: "SM", name: "San Marino", dialCode: "00378", flag: "🇸🇲" },
  { code: "SN", name: "Senegal", dialCode: "00221", flag: "🇸🇳" },
  { code: "SO", name: "Somalia", dialCode: "00252", flag: "🇸🇴" },
  { code: "SR", name: "Suriname", dialCode: "00597", flag: "🇸🇷" },
  { code: "SS", name: "South Sudan", dialCode: "00211", flag: "🇸🇸" },
  { code: "ST", name: "São Tomé and Príncipe", dialCode: "00239", flag: "🇸🇹" },
  { code: "SV", name: "El Salvador", dialCode: "00503", flag: "🇸🇻" },
  { code: "SX", name: "Sint Maarten", dialCode: "00599", flag: "🇸🇽" },
  { code: "SY", name: "Syria", dialCode: "00963", flag: "🇸🇾" },
  { code: "SZ", name: "Eswatini", dialCode: "00268", flag: "🇸🇿" },
  {
    code: "TC",
    name: "Turks and Caicos Islands",
    dialCode: "001649",
    flag: "🇹🇨",
  },
  { code: "TD", name: "Chad", dialCode: "00235", flag: "🇹🇩" },
  {
    code: "TF",
    name: "French Southern Territories",
    dialCode: "0058",
    flag: "🇹🇫",
  },
  { code: "TG", name: "Togo", dialCode: "00228", flag: "🇹🇬" },
  { code: "TH", name: "Thailand", dialCode: "0066", flag: "🇹🇭" },
  { code: "TJ", name: "Tajikistan", dialCode: "00992", flag: "🇹🇯" },
  { code: "TK", name: "Tokelau", dialCode: "00690", flag: "🇹🇰" },
  { code: "TL", name: "Timor‑Leste", dialCode: "00670", flag: "🇹🇱" },
  { code: "TM", name: "Turkmenistan", dialCode: "00993", flag: "🇹🇲" },
  { code: "TN", name: "Tunisia", dialCode: "00216", flag: "🇹🇳" },
  { code: "TO", name: "Tonga", dialCode: "00676", flag: "🇹🇴" },
  { code: "TR", name: "Turkey", dialCode: "0090", flag: "🇹🇷" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "001868", flag: "🇹🇹" },
  { code: "TV", name: "Tuvalu", dialCode: "00688", flag: "🇹🇻" },
  { code: "TW", name: "Taiwan", dialCode: "00886", flag: "🇹🇼" },
  { code: "TZ", name: "Tanzania", dialCode: "00255", flag: "🇹🇿" },
  { code: "UA", name: "Ukraine", dialCode: "00380", flag: "🇺🇦" },
  { code: "UG", name: "Uganda", dialCode: "00256", flag: "🇺🇬" },
  {
    code: "UM",
    name: "U.S. Minor Outlying Islands",
    dialCode: "001",
    flag: "🇺🇲",
  },
  { code: "US", name: "United States", dialCode: "001", flag: "🇺🇸" },
  { code: "UY", name: "Uruguay", dialCode: "00598", flag: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", dialCode: "00998", flag: "🇺🇿" },
  { code: "VA", name: "Vatican City", dialCode: "0039", flag: "🇻🇦" },
  {
    code: "VC",
    name: "Saint Vincent and the Grenadines",
    dialCode: "001784",
    flag: "🇻🇨",
  },
  { code: "VE", name: "Venezuela", dialCode: "0058", flag: "🇻🇪" },
  {
    code: "VG",
    name: "British Virgin Islands",
    dialCode: "001284",
    flag: "🇻🇬",
  },
  { code: "VI", name: "U.S. Virgin Islands", dialCode: "001340", flag: "🇻🇮" },
  { code: "VN", name: "Vietnam", dialCode: "0084", flag: "🇻🇳" },
  { code: "VU", name: "Vanuatu", dialCode: "00678", flag: "🇻🇺" },
  { code: "WF", name: "Wallis and Futuna", dialCode: "00681", flag: "🇼🇫" },
  { code: "WS", name: "Samoa", dialCode: "00685", flag: "🇼🇸" },
  { code: "YE", name: "Yemen", dialCode: "00967", flag: "🇾🇪" },
  { code: "YT", name: "Mayotte", dialCode: "00262", flag: "🇾🇹" },
  { code: "ZA", name: "South Africa", dialCode: "0027", flag: "🇿🇦" },
  { code: "ZM", name: "Zambia", dialCode: "00260", flag: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", dialCode: "00263", flag: "🇿🇼" },
];

// Custom Country Dropdown Component
const CountryDropdown = ({
  value,
  onChange,
  type = "country",
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm)
  );

  const selectedCountry = countries.find((country) =>
    type === "country" ? country.code === value : country.dialCode === value
  );

  const handleSelect = (country) => {
    if (type === "country") {
      onChange(country.code);
    } else {
      onChange(country.dialCode);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${className} ${
          disabled ? "disabled:bg-gray-100" : ""
        } flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <img
                src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
                alt={selectedCountry.name}
                className="w-6 h-4 object-cover"
              />
              <span className="text-sm">
                {type === "country"
                  ? `${selectedCountry.name} (${selectedCountry.code})`
                  : `${selectedCountry.name} - ${selectedCountry.dialCode}`}
              </span>
            </>
          ) : (
            <span className="text-gray-400 text-sm">
              {type === "country"
                ? "Select country"
                : "Select international code"}
            </span>
          )}
        </div>
        {!disabled && (
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto max-h-48">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-sm"
              >
                <img
                  src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                  alt={country.name}
                  className="w-6 h-4 object-cover"
                />
                <span>
                  {type === "country"
                    ? `${country.name} (${country.code})`
                    : `${country.name} - ${country.dialCode}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function TravelersDetails({ country = "" }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [showLoginGuestPopup, setShowLoginGuestPopup] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [loginError, setLoginError] = useState("");

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  // Add these new state variables

  const [signUpError, setSignUpError] = useState("");

  // Supported Card list
  const supportedCardlist = location.state.SupportedCardList;
  console.log(supportedCardlist);

  const [flight, setFlight] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentTravellerIndex, setCurrentTravellerIndex] = useState(0);
  const [totalTravellers, setTotalTravellers] = useState(0);

  const [travellerList, setTravellerList] = useState({ Traveller: [] });

  const [contactDetails, setContactDetails] = useState({
    Name: {
      Title: "Mr",
      NamePartList: {
        NamePart: ["", "", ""],
      },
    },
    Address: {
      Company: "",
      Flat: "",
      BuildingName: "",
      BuildingNumber: "",
      Street: "",
      Locality: "",
      City: "",
      Province: "",
      Postcode: "",
      CountryCode: country || "",
    },
    MobilePhone: {
      InternationalCode: "",
      AreaCode: "",
      Number: "",
      Extension: "",
    },
    Email: "",
  });

  const [billingDetails, setBillingDetails] = useState({
    Name: {
      Title: "Mr",
      NamePartList: {
        NamePart: ["", "", ""],
      },
    },
    Address: {
      Company: "",
      Flat: "",
      BuildingName: "",
      BuildingNumber: "",
      Street: "",
      Locality: "",
      City: "",
      Province: "",
      Postcode: "",
      CountryCode: country || "",
    },
    CreditCard: {
      Company: "Weefly",
      NameOnCard: {
        Title: "Mr",
        NamePartList: {
          NamePart: ["Dominik", "Luambo"],
        },
      },
      Number: import.meta.env.VITE_CARD_NUMBER,
      SecurityCode: import.meta.env.VITE_CARD_SECURITYCODE,
      ExpiryDate: import.meta.env.VITE_CARD_EXPIRYDATE,
      StartDate: import.meta.env.VITE_CARD_STARTDATE,
      CardType: import.meta.env.VITE_CARD_CARDTYPE,
      IssueNumber: "0",
    },
  });

  const [sameAsContact, setSameAsContact] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const TRANSACTION_API_URL = import.meta.env.VITE_TRANSACTION_URL;
  const cardTypes = location.state.SupportedCardList.CardType;
  const cardtoken = Cookies.get("token");

  console.log("tfpay", location.state.TFPay);
  useEffect(() => {
    if (!location.state.TFPay) {
      const getCard = async (cardtype) => {
        try {
          const res = await fetch(
            `${TRANSACTION_API_URL}/getcard/${cardtype}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${cardtoken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          const cardDetail = decryptPayload(data.payload);
          console.log(cardDetail);
          setBillingDetails((prev) => ({
            ...prev,
            CreditCard: {
              ...prev.CreditCard,
              Number: cardDetail.Cardnumber,
              SecurityCode: cardDetail.Cardsecuritycode,
              ExpiryDate: cardDetail.Cardexpirydate,
              StartDate: cardDetail.Cardstartdate,
              CardType: cardDetail.Cardtype,
              IssueNumber: cardDetail.Cardissuenumber,
            },
          }));
        } catch (error) {
          console.error(`Failed to fetch card for ${cardtype}:`, error);
        }
      };

      // Loop through the array and use switch for each card type
      cardTypes.forEach((type) => {
        switch (type) {
          case "Visa Credit":
            getCard("Visa Credit");
            break;
          case "Visa Delta":
            getCard("Visa Delta");
            break;
          case "Visa Debit":
            getCard("Visa Debit");
            break;
          case "Visa Electron":
            getCard("Visa Electron");
            break;
          case "MasterCard":
            getCard("MasterCard");
            break;
          case "American Express":
            getCard("American Express");
            break;
          case "Air Plus":
            getCard("Air Plus");
            break;
          case "Diners Club":
            getCard("Diners Club");
            break;
          case "Connect":
            getCard("Connect");
            break;
          case "EuroCard":
            getCard("EuroCard");
            break;
          case "Discover":
            getCard("Discover");
            break;
          case "Maestro":
            getCard("Maestro");
            break;
          case "Carte Bleue":
            getCard("Carte Bleue");
            break;
          default:
            console.error("Unsupported card type:", type);
        }
      });
    } else {
      setBillingDetails((prev) => {
        const updated = { ...prev };
        delete updated.CreditCard;
        return updated;
      });
    }
  }, [location.state.TFPay]);

  const USER_API_URL =
    import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3000/userapi";
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${USER_API_URL}/getuserprofile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch profile: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);
      const Phonenumber = data.Mobilenumber.split("-");
      console.log("ph", Phonenumber);
      const Nameparts = data.Name.split(" ");
      console.log("np", Nameparts);
      if (Nameparts.length >= 4) {
        setBillingDetails((prevDetails) => ({
          ...prevDetails,
          Name: {
            Title:
              Nameparts[0] !== undefined
                ? Nameparts[0].replace(".", "")
                : prevDetails.Name?.Title,
            NamePartList: {
              NamePart: [
                Nameparts[1] !== undefined
                  ? Nameparts[1]
                  : prevDetails.Name?.NamePartList?.NamePart[0],
                Nameparts[2] !== undefined
                  ? Nameparts[2]
                  : prevDetails.Name?.NamePartList?.NamePart[1],
                Nameparts[3] !== undefined
                  ? Nameparts[3]
                  : prevDetails.Name?.NamePartList?.NamePart[2],
              ],
            },
          },
        }));

        setContactDetails((prevDetails) => ({
          ...prevDetails,
          Name: {
            Title:
              Nameparts[0] !== undefined
                ? Nameparts[0].replace(".", "")
                : prevDetails.Name?.Title,
            NamePartList: {
              NamePart: [
                Nameparts[1] !== undefined
                  ? Nameparts[1]
                  : prevDetails.Name?.NamePartList?.NamePart[0],
                Nameparts[2] !== undefined
                  ? Nameparts[2]
                  : prevDetails.Name?.NamePartList?.NamePart[1],
                Nameparts[3] !== undefined
                  ? Nameparts[3]
                  : prevDetails.Name?.NamePartList?.NamePart[2],
              ],
            },
          },
        }));
      } else {
        setBillingDetails((prevDetails) => ({
          ...prevDetails,
          Name: {
            NamePartList: {
              NamePart: [
                Nameparts[0] !== undefined
                  ? Nameparts[0]
                  : prevDetails.Name?.NamePartList?.NamePart[0],
                Nameparts[1] !== undefined
                  ? Nameparts[1]
                  : prevDetails.Name?.NamePartList?.NamePart[1],
                Nameparts[2] !== undefined
                  ? Nameparts[2]
                  : prevDetails.Name?.NamePartList?.NamePart[2],
              ],
            },
          },
        }));

        setContactDetails((prevDetails) => ({
          ...prevDetails,
          Name: {
            NamePartList: {
              NamePart: [
                Nameparts[0] !== undefined
                  ? Nameparts[0]
                  : prevDetails.Name?.NamePartList?.NamePart[0],
                Nameparts[1] !== undefined
                  ? Nameparts[1]
                  : prevDetails.Name?.NamePartList?.NamePart[1],
                Nameparts[2] !== undefined
                  ? Nameparts[2]
                  : prevDetails.Name?.NamePartList?.NamePart[2],
              ],
            },
          },
        }));
      }

      setContactDetails((prevDetails) => ({
        ...prevDetails,
        Email: data.Emailaddress,
        MobilePhone:
          data.Mobilenumber === "Googleauth" || !data.Mobilenumber
            ? prevDetails.MobilePhone
            : {
                ...prevDetails.MobilePhone,
                Number: Phonenumber[1] || Phonenumber[0],
                InternationalCode: `00${Phonenumber[0]}`,
              },
      }));
      if (data.ContactAddress) {
        setContactDetails((prevDetails) => ({
          ...prevDetails,
          Address: {
            Company: data.ContactAddress.Company || data.ContactAddress.company,
            Flat: data.ContactAddress.Flat || data.ContactAddress.flat,
            BuildingName:
              data.ContactAddress.BuildingName ||
              data.ContactAddress.buildingName,
            BuildingNumber:
              data.ContactAddress.BuildingNumber ||
              data.ContactAddress.buildingNumber,
            Street: data.ContactAddress.Street || data.ContactAddress.street,
            Locality:
              data.ContactAddress.Locality || data.ContactAddress.locality,
            City: data.ContactAddress.City || data.ContactAddress.city,
            Province:
              data.ContactAddress.Province || data.ContactAddress.province,
            Postcode:
              data.ContactAddress.Postcode || data.ContactAddress.postcode,
            CountryCode:
              data.ContactAddress.CountryCode ||
              data.ContactAddress.countryCode,
          },
        }));
      }

      if (data.BillingAddress) {
        setBillingDetails((prevDetails) => ({
          ...prevDetails,
          Address: {
            Company: data.BillingAddress.Company,
            Flat: data.BillingAddress.Flat,
            BuildingName: data.BillingAddress.BuildingName,
            BuildingNumber: data.BillingAddress.BuildingNumber,
            Street: data.BillingAddress.Street,
            Locality: data.BillingAddress.Locality,
            City: data.BillingAddress.City,
            Province: data.BillingAddress.Province,
            Postcode: data.BillingAddress.Postcode,
            CountryCode: data.BillingAddress.CountryCode,
          },
        }));
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const user = Cookies.get("userjwt");

    if (user) {
      fetchUserProfile();
    }
  }, []);

  // empty dependency array = run once after first render

  const handleNumericInput = (value, maxLength = null) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Apply max length if specified
    if (maxLength && numericValue.length > maxLength) {
      return numericValue.slice(0, maxLength);
    }

    return numericValue;
  };

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to get validation class for email
  const getEmailValidationClass = (email) => {
    const baseClass = "w-full border rounded p-2 text-sm";

    if (!email || !email.trim()) {
      return baseClass + " border-red-300 focus:border-red-500";
    }

    if (!isValidEmail(email)) {
      return baseClass + " border-red-300 focus:border-red-500";
    }

    return baseClass + " border-[#CCCCCC] focus:border-blue-500";
  };

  // Function to get validation class for numeric fields
  const getNumericValidationClass = (value) => {
    const baseClass = "w-full border rounded p-2 text-sm";

    if (!value || !value.trim()) {
      return baseClass + " border-red-300 focus:border-red-500";
    }

    return baseClass + " border-[#CCCCCC] focus:border-blue-500";
  };

  // Function to get field validation class
  const getFieldValidationClass = (fieldValue, isRequired = true) => {
    const baseClass = "w-full border rounded p-2 text-sm";

    if (!isRequired) {
      return baseClass + " border-[#CCCCCC]";
    }

    const isEmpty =
      !fieldValue || (typeof fieldValue === "string" && !fieldValue.trim());

    if (isEmpty) {
      return baseClass + " border-red-300 focus:border-red-500";
    }

    return baseClass + " border-[#CCCCCC] focus:border-blue-500";
  };

  const validateTravellerDetails = (traveller) => {
    const errors = [];

    if (!traveller.Name?.Title) {
      errors.push("Title is required");
    }

    if (!traveller.Name?.NamePartList?.NamePart?.[0]?.trim()) {
      errors.push("First Name is required");
    }

    if (!traveller.Name?.NamePartList?.NamePart?.[2]?.trim()) {
      errors.push("Last Name is required");
    }

    if (
      !traveller.CustomSupplierParameterList?.CustomSupplierParameter?.[0]
        ?.Value
    ) {
      errors.push("Date of Birth is required");
    }

    if (!traveller.Age) {
      errors.push("Age is required");
    }

    return errors;
  };

  const validateContactDetails = (contact) => {
    const errors = [];

    // Name validation - ALL fields required
    if (!contact.Name?.Title) {
      errors.push("Title is required");
    }

    if (!contact.Name?.NamePartList?.NamePart?.[0]?.trim()) {
      errors.push("First Name is required");
    }

    if (!contact.Name?.NamePartList?.NamePart?.[1]?.trim()) {
      errors.push("Middle Name is required");
    }

    if (!contact.Name?.NamePartList?.NamePart?.[2]?.trim()) {
      errors.push("Last Name is required");
    }

    // Address validation - ALL fields required
    if (!contact.Address?.Company?.trim()) {
      errors.push("Company is required");
    }

    if (!contact.Address?.Flat?.trim()) {
      errors.push("Flat/Apartment is required");
    }

    if (!contact.Address?.BuildingName?.trim()) {
      errors.push("Building Name is required");
    }

    if (!contact.Address?.BuildingNumber?.trim()) {
      errors.push("Building Number is required");
    }

    if (!contact.Address?.Street?.trim()) {
      errors.push("Street is required");
    }

    if (!contact.Address?.Locality?.trim()) {
      errors.push("Locality is required");
    }

    if (!contact.Address?.City?.trim()) {
      errors.push("City is required");
    }

    if (!contact.Address?.Province?.trim()) {
      errors.push("Province/State is required");
    }

    if (!contact.Address?.Postcode?.trim()) {
      errors.push("Postcode is required");
    } else if (!/^\d+$/.test(contact.Address.Postcode.trim())) {
      errors.push("Postcode must contain only numbers");
    }

    if (!contact.Address?.CountryCode?.trim()) {
      errors.push("Country Code is required");
    }

    // Phone validation - ALL fields required
    if (!contact.MobilePhone?.InternationalCode?.trim()) {
      errors.push("International Code is required");
    }

    if (!contact.MobilePhone?.Number?.trim()) {
      errors.push("Phone Number is required");
    } else if (!/^\d+$/.test(contact.MobilePhone.Number.trim())) {
      errors.push("Phone Number must contain only numbers");
    }

    // Email validation with proper format check
    if (!contact.Email?.trim()) {
      errors.push("Email is required");
    } else if (!isValidEmail(contact.Email.trim())) {
      errors.push(
        "Please enter a valid email address (e.g., user@example.com)"
      );
    }

    return errors;
  };

  // Replace your existing validateBillingDetails function with this updated version
  const validateBillingDetails = (billing) => {
    const errors = [];

    // Name validation - ALL fields required
    if (!billing.Name?.Title) {
      errors.push("Billing Title is required");
    }

    if (!billing.Name?.NamePartList?.NamePart?.[0]?.trim()) {
      errors.push("Billing First Name is required");
    }

    if (!billing.Name?.NamePartList?.NamePart?.[1]?.trim()) {
      errors.push("Billing Middle Name is required");
    }

    if (!billing.Name?.NamePartList?.NamePart?.[2]?.trim()) {
      errors.push("Billing Last Name is required");
    }

    // Address validation - ALL fields required
    if (!billing.Address?.Company?.trim()) {
      errors.push("Billing Company is required");
    }

    if (!billing.Address?.Flat?.trim()) {
      errors.push("Billing Flat/Apartment is required");
    }

    if (!billing.Address?.BuildingName?.trim()) {
      errors.push("Billing Building Name is required");
    }

    if (!billing.Address?.BuildingNumber?.trim()) {
      errors.push("Billing Building Number is required");
    }

    if (!billing.Address?.Street?.trim()) {
      errors.push("Billing Street is required");
    }

    if (!billing.Address?.Locality?.trim()) {
      errors.push("Billing Locality is required");
    }

    if (!billing.Address?.City?.trim()) {
      errors.push("Billing City is required");
    }

    if (!billing.Address?.Province?.trim()) {
      errors.push("Billing Province/State is required");
    }

    if (!billing.Address?.Postcode?.trim()) {
      errors.push("Billing Postcode is required");
    } else if (!/^\d+$/.test(billing.Address.Postcode.trim())) {
      errors.push("Billing Postcode must contain only numbers");
    }

    if (!billing.Address?.CountryCode?.trim()) {
      errors.push("Billing Country Code is required");
    }

    // // Credit Card validation - ALL fields required
    // if (!billing.CreditCard?.Company?.trim()) {
    //   errors.push("Credit Card Company is required");
    // }

    // if (!billing.CreditCard?.Number?.trim()) {
    //   errors.push("Credit Card Number is required");
    // }

    // if (!billing.CreditCard?.SecurityCode?.trim()) {
    //   errors.push("Credit Card Security Code is required");
    // }

    // if (!billing.CreditCard?.ExpiryDate?.trim()) {
    //   errors.push("Credit Card Expiry Date is required");
    // }

    // if (!billing.CreditCard?.StartDate?.trim()) {
    //   errors.push("Credit Card Start Date is required");
    // }

    // if (!billing.CreditCard?.CardType?.trim()) {
    //   errors.push("Credit Card Type is required");
    // }

    // if (!billing.CreditCard?.IssueNumber?.trim()) {
    //   errors.push("Credit Card Issue Number is required");
    // }

    // // Card Name validation
    // if (!billing.CreditCard?.NameOnCard?.Title) {
    //   errors.push("Name on Card Title is required");
    // }

    // if (!billing.CreditCard?.NameOnCard?.NamePartList?.NamePart?.[0]?.trim()) {
    //   errors.push("Name on Card First Name is required");
    // }

    // if (!billing.CreditCard?.NameOnCard?.NamePartList?.NamePart?.[1]?.trim()) {
    //   errors.push("Name on Card Last Name is required");
    // }

    return errors;
  };

  const isCurrentStepValid = () => {
    let errors = [];

    if (currentStep <= totalTravellers) {
      // Validate current traveller
      const currentTraveller =
        travellerList.Traveller[currentTravellerIndex] || {};
      console.log("Validating traveller:", currentTraveller); // Debug log
      errors = validateTravellerDetails(currentTraveller);
    } else if (currentStep === totalTravellers + 1) {
      // Validate contact details
      console.log("Validating contact details:", contactDetails); // Debug log
      errors = validateContactDetails(contactDetails);
    } else {
      // Validate billing details
      console.log("Validating billing details:", billingDetails); // Debug log
      errors = validateBillingDetails(billingDetails);
    }

    console.log(
      "Current step:",
      currentStep,
      "Total travellers:",
      totalTravellers
    );
    console.log("Validation errors found:", errors);

    return errors;
  };
  // 🔁 🔽 ADD THIS BLOCK RIGHT HERE
  // useEffect(() => {
  //   const savedContact = sessionStorage.getItem("traveller_contactDetails");
  //   const savedBilling = sessionStorage.getItem("traveller_billingDetails");
  //   const savedTravellers = sessionStorage.getItem("traveller_list");

  //   if (savedContact) setContactDetails(JSON.parse(savedContact));
  //   if (savedBilling) setBillingDetails(JSON.parse(savedBilling));
  //   if (savedTravellers) setTravellerList(JSON.parse(savedTravellers));
  // }, []);

  // useEffect(() => {
  //   const savedData = sessionStorage.getItem("travellerDetails");
  //   if (savedData) {
  //     const parsed = JSON.parse(savedData);
  //     if (parsed) {
  //       setTravellerList(parsed.TravellerList || { Traveller: [] });
  //       setContactDetails(parsed.ContactDetails || {});
  //       setBillingDetails(parsed.BillingDetails || {});
  //     }
  //   }
  // }, []);

  // ✅ Existing useEffect for location state stays here
  useEffect(() => {
    if (location.state && location.state.flights) {
      setFlight(location.state.flights);
    }

    console.log(location.state.travalers);

    if (location.state && location.state.travalers) {
      const travellerCount = location.state.travalers.length;
      setTotalTravellers(travellerCount);

      const initialTravellers = location.state.travalers.map(
        (traveler, index) => ({
          Age: "",
          Name: {
            Title: "Mr",
            NamePartList: {
              NamePart: ["", "", ""],
            },
          },
          CustomSupplierParameterList: {
            CustomSupplierParameter: [
              {
                Name: "DateOfBirth",
                Value: "",
              },
            ],
          },
        })
      );
      setTravellerList({ Traveller: initialTravellers });
    }
  }, [location]);

  // Update country code when country prop changes
  useEffect(() => {
    if (country) {
      setContactDetails((prev) => ({
        ...prev,
        Address: {
          ...prev.Address,
          CountryCode: country,
        },
      }));
      setBillingDetails((prev) => ({
        ...prev,
        Address: {
          ...prev.Address,
          CountryCode: country,
        },
      }));
    }
  }, [country]);
  useEffect(() => {
    // If coming back from SeatSelection
    if (location.state?.travellerDetails) {
      const { TravellerList, ContactDetails, BillingDetails } =
        location.state.travellerDetails;

      if (TravellerList)
        setTravellerList({ Traveller: TravellerList.Traveller || [] });
      if (ContactDetails) setContactDetails(ContactDetails);
      if (BillingDetails) setBillingDetails(BillingDetails);
      return; // 👉 Do not run next block
    }

    // Otherwise: fresh init from .travalers
    if (location.state && location.state.travalers) {
      const travellerCount = location.state.travalers.length;
      setTotalTravellers(travellerCount);

      const initialTravellers = location.state.travalers.map(() => ({
        Age: "",
        Name: {
          Title: "Mr",
          NamePartList: {
            NamePart: ["", "", ""],
          },
        },
        CustomSupplierParameterList: {
          CustomSupplierParameter: [
            {
              Name: "DateOfBirth",
              Value: "",
            },
          ],
        },
      }));

      setTravellerList({ Traveller: initialTravellers });
    }

    if (location.state && location.state.flights) {
      setFlight(location.state.flights);
    }
  }, [location]);

  console.log(location.state.flights);

  const OutwardTicket = location.state?.flights?.[0];
  const returnTicket = location.state?.flights?.[1];

  console.log("OutwardTicket", OutwardTicket);

  // const dobvalidate = (dob) => {
  //   const tripType = location.state.tripType;
  //   let age;

  //   const birthDate = new Date(dob);

  //   let ticketYear;

  //   if (tripType === "One Way") {
  //     ticketYear = OutwardTicket?.departureDate?.split("-")[0];
  //   }

  //   if (tripType === "Round Trip") {
  //     ticketYear = returnTicket?.departureDate?.split("-")[0];
  //   }
  //   const ConvertedTicketYear = ticketYear.split("/")[2]; // "2025"
  //   const ConvertedTicketMonth = ticketYear.split("/")[1];

  //   age = ConvertedTicketYear - birthDate.getFullYear();
  //   const m = ConvertedTicketMonth - birthDate.getMonth();

  //   if (m < 0 || (m === 0 && ConvertedTicketMonth < birthDate.getDate())) {
  //     age--;
  //   }

  //   console.log(age);

  //   handleTravellerChange("age", age);
  // };

  const dobvalidate = (dob) => {
    if (!dob) {
      console.warn("DOB is empty, skipping validation.");
      return;
    }

    const tripType = location.state.tripType;
    let age;

    const birthDate = new Date(dob);
    let ticketYear;

    if (tripType === "One Way") {
      ticketYear = OutwardTicket?.segments[0].departureDate?.split("-")[0];
    }

    if (tripType === "Round Trip") {
      ticketYear = returnTicket?.segments[0].departureDate?.split("-")[0];
    }

    if (!ticketYear) {
      console.warn("Ticket year not found.");
      return;
    }

    const ConvertedTicketYear = ticketYear.split("/")[2]; // "2025"
    const ConvertedTicketMonth = ticketYear.split("/")[1];

    if (!ConvertedTicketYear || !ConvertedTicketMonth) {
      console.warn("Invalid ticket date format.");
      return;
    }

    age = ConvertedTicketYear - birthDate.getFullYear();
    const m = ConvertedTicketMonth - birthDate.getMonth();

    if (m < 0 || (m === 0 && birthDate.getDate() > ConvertedTicketMonth)) {
      age--;
    }

    console.log(age);
    handleTravellerChange("age", age);
  };

  const handleTravellerChange = (field, value) => {
    const updatedTravellers = [...travellerList.Traveller];

    if (field === "age") {
      updatedTravellers[currentTravellerIndex].Age = parseInt(value) || "";
    } else if (field === "title") {
      updatedTravellers[currentTravellerIndex].Name.Title = value;
    } else if (field === "firstName") {
      updatedTravellers[currentTravellerIndex].Name.NamePartList.NamePart[0] =
        value;
    } else if (field === "middleName") {
      updatedTravellers[currentTravellerIndex].Name.NamePartList.NamePart[1] =
        value;
    } else if (field === "lastName") {
      updatedTravellers[currentTravellerIndex].Name.NamePartList.NamePart[2] =
        value;
    } else if (field === "dateOfBirth") {
      updatedTravellers[
        currentTravellerIndex
      ].CustomSupplierParameterList.CustomSupplierParameter[0].Value = value;
    }

    setTravellerList({ Traveller: updatedTravellers });
  };

  const handleContactChange = (field, value) => {
    setContactDetails((prev) => {
      const updated = { ...prev };

      if (field === "title") {
        updated.Name.Title = value;
      } else if (field === "firstName") {
        updated.Name.NamePartList.NamePart[0] = value;
      } else if (field === "middleName") {
        updated.Name.NamePartList.NamePart[1] = value;
      } else if (field === "lastName") {
        updated.Name.NamePartList.NamePart[2] = value;
      } else if (field === "email") {
        updated.Email = value;
      } else if (field.startsWith("address.")) {
        const addressField = field.split(".")[1];
        updated.Address[addressField] = value;
      } else if (field.startsWith("phone.")) {
        const phoneField = field.split(".")[1];
        updated.MobilePhone[phoneField] = value;
      }

      return updated;
    });
  };

  const handleBillingChange = (field, value) => {
    setBillingDetails((prev) => {
      const updated = { ...prev };

      if (field === "title") {
        updated.Name.Title = value;
      } else if (field === "firstName") {
        updated.Name.NamePartList.NamePart[0] = value;
      } else if (field === "middleName") {
        updated.Name.NamePartList.NamePart[1] = value;
      } else if (field === "lastName") {
        updated.Name.NamePartList.NamePart[2] = value;
      } else if (field.startsWith("address.")) {
        const addressField = field.split(".")[1];
        updated.Address[addressField] = value;
      } else if (field.startsWith("card.")) {
        const cardField = field.split(".")[1];
        updated.CreditCard[cardField] = value;
      }

      return updated;
    });
  };

  const handleSameAsContactChange = (checked) => {
    setSameAsContact(checked);
    if (checked) {
      setBillingDetails((prev) => ({
        ...prev,
        Name: {
          Title: contactDetails.Name.Title,
          NamePartList: {
            NamePart: [...contactDetails.Name.NamePartList.NamePart],
          },
        },
        Address: { ...contactDetails.Address },
      }));
    }
  };

  const getStepInfo = () => {
    if (currentStep <= totalTravellers) {
      return {
        title: `Traveller ${currentStep} Details`,
        stepNumber: currentStep,
        totalSteps: totalTravellers + 2,
      };
    } else if (currentStep === totalTravellers + 1) {
      return {
        title: "Contact Details",
        stepNumber: currentStep,
        totalSteps: totalTravellers + 2,
      };
    } else {
      return {
        title: "Billing Details",
        stepNumber: currentStep,
        totalSteps: totalTravellers + 2,
      };
    }
  };
  // Removes all empty values and empty objects recursively
  const cleanData = (obj) => {
    if (Array.isArray(obj)) {
      const cleanedArray = obj
        .map(cleanData)
        .filter(
          (item) =>
            item !== null &&
            item !== "" &&
            item !== undefined &&
            !(typeof item === "object" && Object.keys(item).length === 0)
        );
      return cleanedArray.length ? cleanedArray : null;
    }

    if (typeof obj === "object" && obj !== null) {
      const cleanedObject = {};
      for (const key in obj) {
        const cleanedValue = cleanData(obj[key]);
        if (
          cleanedValue !== null &&
          cleanedValue !== "" &&
          cleanedValue !== undefined &&
          !(
            typeof cleanedValue === "object" &&
            Object.keys(cleanedValue).length === 0
          )
        ) {
          cleanedObject[key] = cleanedValue;
        }
      }
      return Object.keys(cleanedObject).length ? cleanedObject : null;
    }

    return obj;
  };

  const handleContinue = async () => {
    // Always check validation first
    const errors = isCurrentStepValid();

    console.log("Validation errors:", errors); // Debug log

    if (errors.length > 0) {
      console.log("Showing validation popup"); // Debug log
      setValidationErrors(errors);
      setShowValidationPopup(true);
      return; // Stop execution if validation fails
    }

    // If validation passes, proceed with existing logic
    if (currentStep <= totalTravellers) {
      if (currentStep < totalTravellers) {
        setCurrentStep(currentStep + 1);
        setCurrentTravellerIndex(currentTravellerIndex + 1);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === totalTravellers + 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - Show popup directly without API call
      const finalData = {
        TravellerList: travellerList,
        ContactDetails: contactDetails,
        BillingDetails: billingDetails,
      };

      console.log("Final booking data:", JSON.stringify(finalData, null, 2));
      const user = Cookies.get("userjwt");

      if (user) {
        handleContinueAsGuest();
      } else {
        // Show popup directly
        setShowLoginGuestPopup(true);
      }
    }
  };

  // Handle Navigation
  const handleAuthNavigation = () => {
    setShowLoginGuestPopup(false);
    // Clear any previous errors
    setLoginError("");
    setSignUpError("");

    setShowLoginForm(true);
  };
  // Handle Continue as Guest
  const handleContinueAsGuest = async () => {
    console.log("Function calls!!");
    const areAddressesSame =
      JSON.stringify(contactDetails.Address) ===
      JSON.stringify(billingDetails.Address);
    const finalData = {
      TravellerList: travellerList,
      ContactDetails: contactDetails,
      BillingDetails: billingDetails,
    };

    try {
      const userService = import.meta.env.VITE_USER_SERVICE_URL;
      const response = await fetch(`${userService}/guestregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          payload: contactDetails,
          ...(areAddressesSame ? {} : { BillingDetails: billingDetails }),
        }),
      });
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setShowLoginGuestPopup(false);
        // Navigate to next page
        navigateToSeatSelection(finalData, data.userId);
      } else if (response.status === 409) {
        const data = await response.json();
        console.log(data);
        if (data.role.includes("Guest")) {
          setShowLoginGuestPopup(false);
          // Navigate to next page
          navigateToSeatSelection(finalData, data.userId);
        } else if (data.role.includes("User") || data.role.includes("Agent")) {
          console.log("Works");
          setShowLoginGuestPopup(false);
          // Show notification that user already exists
          setValidationErrors([
            "You are an existing customer. Please login to continue with your account benefits and saved preferences.",
          ]);
          setShowValidationPopup(true);
        }
      } else if (response.status === 422) {
        console.error("Payload missing");
        setValidationErrors([
          "There was an error with your booking data. Please try again.",
        ]);
        setShowValidationPopup(true);
      }
    } catch (error) {
      console.error("Error registering guest:", error);
      setValidationErrors([
        "Network error. Please check your connection and try again.",
      ]);
      setShowValidationPopup(true);
    }
  };

  // Handle Login to Continue
  // const handleLoginToContinue = () => {
  //   setShowLoginGuestPopup(false);

  //   // Auto-populate email if available
  //   if (contactDetails.Email) {
  //     setLoginCredentials((prev) => ({
  //       ...prev,
  //       email: contactDetails.Email,
  //     }));
  //   }

  //   setShowLoginForm(true);
  // };

  // Handle Login
  const handleLogin = async (credentials) => {
    setLoginError("");

    if (!credentials.email || !credentials.password) {
      setLoginError("Please enter both email and password");
      return;
    }

    try {
      const userService = import.meta.env.VITE_USER_SERVICE_URL;
      const response = await fetch(`${userService}/userlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          Emailaddress: credentials.email,
          Password: credentials.password,
        }),
      });

      if (response.status === 200) {
        setShowLoginForm(false);
        const finalData = {
          TravellerList: travellerList,
          ContactDetails: contactDetails,
          BillingDetails: billingDetails,
        };
        const data = await fetchUserProfile();
        navigateToSeatSelection(finalData, data._id);
      } else if (response.status === 401) {
        setLoginError("Invalid email or password. Please try again.");
      } else if (response.status === 400) {
        setLoginError(
          "You are not a registered user. Please sign up to continue."
        );
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);

      setLoginError(
        "Network error. Please check your connection and try again."
      );
    }
  };

  // ADD this missing function (you have all the others):
  const handleGoogleLogin = async () => {
    const userData = await HandleGoogleLogin();
    console.log(userData);
    let credentials = {
      email: "",
      password: "Googleauth",
    };
    credentials.email = userData.email;
    handleLogin(credentials);
  };

  // Add new function to handle login redirect from signup:
  const handleLoginRedirect = () => {
    setShowSignUpForm(false);
    setSignUpError("");
    setShowLoginForm(true);
  };

  const handleSignUp = async (signUpData) => {
    setSignUpError("");
    if (
      !signUpData.name ||
      !signUpData.phone ||
      !signUpData.email ||
      !signUpData.password
    ) {
      setSignUpError("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpData.email)) {
      setSignUpError("Please enter a valid email address");
      return;
    }

    const finalData = {
      TravellerList: travellerList,
      ContactDetails: contactDetails,
      BillingDetails: billingDetails,
    };

    let finaldata = {
      flight: location.state.flights,
      travellerDetails: finalData,
      flights: location.state.flights,
      tripType: location.state.tripType,
      routingId: location.state.routingId,
      seatOption: location.state.seatOption,
      luggageOptions: location.state.luggageOptions,
      outwardLuggage: location.state.outwardLuggage,
      returnLuggage: location.state.returnLuggage,
      CardCharges: location.state.CardCharges,
      SupportedCardList: location.state.SupportedCardList,
    };
    let payload = {
      Emailaddress: signUpData.email,
      Name: signUpData.name,
      Mobilenumber: signUpData.phone,
      Password: signUpData.password,
      finaldata,
    };
    if (signUpData.password !== "Googleauth") {
      payload = {
        email: signUpData.email,
        name: signUpData.name,
        phone: signUpData.phone,
        Password: signUpData.password,
        finaldata,
      };
    }
    try {
      const userService = import.meta.env.VITE_USER_SERVICE_URL;
      const response = await fetch(`${userService}/userregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          payload,
        }),
      });
      if (response.status === 200) {
        console.log("Works");
        // setShowSignUpForm(false);
        setIsVerifyingOtp(true);
      } else if (response.status === 201) {
        console.log(response);
        setShowSignUpForm(false);
        let userId = "undefined";
        const finalData = {
          TravellerList: travellerList,
          ContactDetails: contactDetails,
          BillingDetails: billingDetails,
        };
        navigateToSeatSelection(finalData, userId);
      } else if (response.status === 409) {
        setSignUpError(
          "An account with this email already exists. Please login instead."
        );
      } else {
        setSignUpError("Registration failed. Please try again.");
      }
    } catch (error) {
      setSignUpError(
        "Network error. Please check your connection and try again."
      );
    }
  };

  const handleSignUpRedirect = () => {
    setShowLoginForm(false);
    setLoginError("");
    setShowSignUpForm(true);
  };
  // Add new function to handle Google signup:
  const handleGoogleSignUp = async () => {
    const userData = await HandleGoogleLogin();

    if (userData) {
      const googleFormData = {
        name: userData.name,
        phone: "Googleauth",
        email: userData.email,
        password: "Googleauth",
      };
      await handleSignUp(googleFormData);
    }
  };

  // Navigate to Seat Selection
  const navigateToSeatSelection = (finalData, userId) => {
    navigate("/booking/SeatSelection", {
      state: {
        flight: location.state.flights,
        travellerDetails: finalData,
        flights: location.state.flights,
        tripType: location.state.tripType,
        routingId: location.state.routingId,
        seatOption: location.state.seatOption,
        luggageOptions: location.state.luggageOptions,
        outwardLuggage: location.state.outwardLuggage,
        returnLuggage: location.state.returnLuggage,
        CardCharges: location.state.CardCharges,
        SupportedCardList: location.state.SupportedCardList,
        guestId: userId || "undefined",
        TFPay: location.state.TFPay,
      },
    });
  };
  const handleBack = () => {
    if (currentStep > 1) {
      if (currentStep <= totalTravellers) {
        setCurrentStep(currentStep - 1);
        setCurrentTravellerIndex(currentTravellerIndex - 1);
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else {
      navigate(-1);
    }
  };

  const getCurrentTraveller = () => {
    if (currentStep <= totalTravellers) {
      return travellerList.Traveller[currentTravellerIndex] || {};
    }
    return {};
  };

  if (!flight) return <p className="text-center mt-20 font-sans">Loading...</p>;

  const stepInfo = getStepInfo();
  const currentTraveller = getCurrentTraveller();

  // Updated LoginGuestPopup
  const LoginGuestPopup = ({
    isOpen,
    onClose,
    onContinueAsGuest,
    onAuthNavigation,
    isExistingUser,
    isCheckingUser,
    userEmail,
  }) => {
    if (!isOpen) return null;

    return (
      <>
        {/* Premium Backdrop */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
          onClick={onClose}
        >
          {/* Premium Modal */}
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation:
                "premiumSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow:
                "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)",
            }}
          >
            <style jsx>{`
              @keyframes premiumSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(-20px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            {/*  Header */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="relative px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Complete Your Booking
                      </h3>
                      <p className="text-orange-100 text-sm mt-1">
                        {isCheckingUser
                          ? "Verifying your account status..."
                          : "Choose your preferred booking method"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/*  Content */}
            <div className="px-6 py-6">
              {isCheckingUser ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative">
                    <div className="w-12 h-12 border-3 border-orange-100 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-3 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold text-gray-900">
                      Verifying Account
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Please wait a moment...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/*  Guest Option */}
                  <button
                    onClick={onContinueAsGuest}
                    className="w-full group relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300"></div>
                    <div className="relative p-5">
                      <div className="flex items-start space-x-4">
                        <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-orange-500 group-hover:shadow-md">
                          <svg
                            className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                            Continue as Guest
                          </h4>
                          <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
                            Quick and easy booking without creating an account.
                            Perfect for one-time bookings.
                          </p>
                          <div className="flex items-center mt-3 text-xs text-gray-500">
                            <div className="flex items-center mr-4">
                              <svg
                                className="w-3 h-3 mr-1 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              No registration
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-3 h-3 mr-1 text-green-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Instant booking
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Login Option - Changed from Auth to Login */}
                  <button
                    onClick={onAuthNavigation}
                    className="w-full group relative overflow-hidden rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-500 hover:to-orange-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="relative p-5">
                      <div className="flex items-start space-x-4">
                        <div className="w-11 h-11 bg-orange-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:shadow-md">
                          <svg
                            className="w-5 h-5 text-white group-hover:text-orange-500 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-bold text-orange-800 group-hover:text-white transition-colors duration-300">
                            Login to Continue
                          </h4>
                          <p className="text-orange-700 group-hover:text-orange-100 text-sm mt-1.5 leading-relaxed transition-colors duration-300">
                            Access your account to enjoy saved preferences,
                            booking history, and exclusive member benefits.
                          </p>
                          <div className="flex items-center mt-3 text-xs text-orange-600 group-hover:text-orange-200 transition-colors duration-300">
                            <div className="flex items-center mr-4">
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Saved data
                            </div>
                            <div className="flex items-center">
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Quick booking
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>
                  Your data is secure and encrypted with industry-standard
                  protection
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Fixed LoginFormPopup Component with local state management and cursor pointers
  const LoginFormPopup = ({
    isOpen,
    onClose,
    onLogin,
    onGoogleLogin,
    onSignUpRedirect,
    initialEmail = "",
    error,
  }) => {
    // LOCAL STATE - this prevents re-renders from parent
    const [credentials, setCredentials] = useState({
      email: initialEmail,
      password: "",
    });

    // Update local state when popup opens with new initial email
    useEffect(() => {
      if (isOpen && initialEmail !== credentials.email) {
        setCredentials((prev) => ({
          ...prev,
          email: initialEmail,
        }));
      }
    }, [isOpen, initialEmail]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(credentials);
    };

    const handleEmailChange = (e) => {
      setCredentials((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    };

    const handlePasswordChange = (e) => {
      setCredentials((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    };

    // Check if error indicates user not found
    const isUserNotFoundError =
      error &&
      (error.includes("Account not found") ||
        error.includes("not found") ||
        error.includes("not a registered user"));

    return (
      <>
        {/* Professional Backdrop */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 cursor-pointer"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={onClose}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-md transform transition-all duration-300 ease-out cursor-default"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalSlideIn 0.3s ease-out",
            }}
          >
            <style jsx>{`
              @keyframes modalSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(-20px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            {/* Professional Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              {/* Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Login to Your Account
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Enter your credentials to continue
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-red-800 font-medium">
                          {error}
                        </p>
                        {isUserNotFoundError && (
                          <button
                            onClick={() => onSignUpRedirect(credentials.email)}
                            className="mt-3 text-sm font-semibold text-orange-600 hover:text-orange-700 underline transition-colors duration-200 cursor-pointer"
                          >
                            Click here to Sign Up →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={credentials.email}
                      onChange={handleEmailChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white cursor-text"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white cursor-text"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Login to Account
                  </button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onGoogleLogin}
                    className="w-full mt-4 bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 font-bold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Don't have account link */}
                  <div className="text-center pt-4 border-t border-gray-100 mt-6">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => onSignUpRedirect(credentials.email)}
                        className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 cursor-pointer"
                      >
                        Sign up here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ValidationPopup = ({ isOpen, errors, onClose }) => {
    if (!isOpen) return null;

    return (
      <>
        {/* Professional Blur Backdrop */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
          }}
        >
          {/* Professional Modal Container */}
          <div
            className="relative w-full max-w-md transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalSlideIn 0.3s ease-out",
            }}
          >
            {/* Add keyframe animation */}
            <style jsx>{`
              @keyframes modalSlideIn {
                from {
                  opacity: 0;
                  transform: translateY(-16px) scale(0.95);
                }
                to {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
            `}</style>

            {/* Professional Card */}
            <div
              className="bg-white rounded-lg overflow-hidden"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
              }}
            >
              {/* Clean Header */}
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Professional Alert Icon */}
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-amber-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>

                    {/* Professional Title */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-jakarta">
                        Required Fields Missing
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Please complete all required information
                      </p>
                    </div>
                  </div>

                  {/* Clean Close Button */}
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Professional Content */}
              <div className="px-6 py-5">
                <div className="max-h-80 overflow-y-auto">
                  {/* Error Counter */}
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-800 font-medium">
                      <span className="font-semibold">{errors.length}</span>{" "}
                      field{errors.length !== 1 ? "s" : ""} require
                      {errors.length === 1 ? "s" : ""} your attention
                    </p>
                  </div>

                  {/* Professional Error List */}
                  <div className="space-y-3">
                    {errors.map((error, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-150"
                      >
                        {/* Clean Error Icon */}
                        <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        {/* Professional Error Text */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 font-medium leading-relaxed">
                            {error}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Professional Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="w-full bg-[#EE5128] hover:bg-[#d64520] cursor-pointer text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#EE5128] focus:ring-offset-2 font-jakarta"
                >
                  I understand
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="font-sans flex justify-center">
      <div className="w-full flex flex-col items-start">
        {/* Progress indicator */}
        <div className="w-full max-w-[656px] mb-6">
          <div className="flex items-center justify-center">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#EE5128] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (stepInfo.stepNumber / stepInfo.totalSteps) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-600">
              {Math.round((stepInfo.stepNumber / stepInfo.totalSteps) * 100)}%
            </span>
          </div>
        </div>

        {/* Main Content + Booking side-by-side */}
        <div className="flex flex-col lg:flex-row gap-10 items-start w-full">
          {/* Main Content */}
          <div className="max-w-[656px] w-full">
            {currentStep <= totalTravellers ? (
              // Traveller Details Steps
              <div className="bg-white rounded-md">
                <div className="bg-[#FFE4DB] p-3 rounded-t-md">
                  <h2 className="font-semibold font-jakarta">
                    Traveller {currentStep} Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <select
                        value={currentTraveller.Name?.Title || "Mr"}
                        onChange={(e) =>
                          handleTravellerChange("title", e.target.value)
                        }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={
                          currentTraveller.Name?.NamePartList?.NamePart?.[0] ||
                          ""
                        }
                        onChange={(e) =>
                          handleTravellerChange("firstName", e.target.value)
                        }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={
                          currentTraveller.Name?.NamePartList?.NamePart?.[2] ||
                          ""
                        }
                        onChange={(e) =>
                          handleTravellerChange("lastName", e.target.value)
                        }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                        placeholder="Enter last"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={
                          currentTraveller.CustomSupplierParameterList
                            ?.CustomSupplierParameter?.[0]?.Value || ""
                        }
                        onChange={(e) => {
                          handleTravellerChange("dateOfBirth", e.target.value),
                            setTimeout(() => {
                              dobvalidate(e.target.value);
                            }, 3000);
                        }}
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        value={currentTraveller.Age || ""}
                        // onChange={(e) =>
                        //   handleTravellerChange("age", e.target.value)
                        // }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                        placeholder="Enter age"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : currentStep === totalTravellers + 1 ? (
              // Contact Details Step
              // Replace the Contact Details Step section with this updated version

              // Contact Details Step
              <div className="bg-white rounded-md">
                <div className="bg-[#FFE4DB] p-3 rounded-t-md">
                  <h2 className="font-semibold font-jakarta">
                    Contact Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <select
                        value={contactDetails.Name.Title}
                        onChange={(e) =>
                          handleContactChange("title", e.target.value)
                        }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Name.NamePartList.NamePart[0]}
                        onChange={(e) =>
                          handleContactChange("firstName", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Name.NamePartList.NamePart[0],
                          true
                        )}
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Name.NamePartList.NamePart[1]}
                        onChange={(e) =>
                          handleContactChange("middleName", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Name.NamePartList.NamePart[1],
                          true
                        )}
                        placeholder="Enter middle name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Name.NamePartList.NamePart[2]}
                        onChange={(e) =>
                          handleContactChange("lastName", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Name.NamePartList.NamePart[2],
                          true
                        )}
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Company}
                        onChange={(e) =>
                          handleContactChange("address.Company", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.Company,
                          true
                        )}
                        placeholder="Enter company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Flat/Apartment
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Flat}
                        onChange={(e) =>
                          handleContactChange("address.Flat", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.Flat,
                          true
                        )}
                        placeholder="Enter flat/apartment"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Building Name
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.BuildingName}
                        onChange={(e) =>
                          handleContactChange(
                            "address.BuildingName",
                            e.target.value
                          )
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.BuildingName,
                          true
                        )}
                        placeholder="Enter building name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Building Number
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.BuildingNumber}
                        onChange={(e) =>
                          handleContactChange(
                            "address.BuildingNumber",
                            e.target.value
                          )
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.BuildingNumber,
                          true
                        )}
                        placeholder="Enter building number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Street
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Street}
                        onChange={(e) =>
                          handleContactChange("address.Street", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.Street,
                          true
                        )}
                        placeholder="Enter street"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Locality
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Locality}
                        onChange={(e) =>
                          handleContactChange(
                            "address.Locality",
                            e.target.value
                          )
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.Locality,
                          true
                        )}
                        placeholder="Enter locality"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.City}
                        onChange={(e) =>
                          handleContactChange("address.City", e.target.value)
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.City,
                          true
                        )}
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Province/State
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Province}
                        onChange={(e) =>
                          handleContactChange(
                            "address.Province",
                            e.target.value
                          )
                        }
                        className={getFieldValidationClass(
                          contactDetails.Address.Province,
                          true
                        )}
                        placeholder="Enter province/state"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Postcode <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (Numbers only)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.Postcode}
                        onChange={(e) => {
                          const numericValue = handleNumericInput(
                            e.target.value,
                            10
                          ); // Max 10 digits
                          handleContactChange("address.Postcode", numericValue);
                        }}
                        className={getNumericValidationClass(
                          contactDetails.Address.Postcode
                        )}
                        placeholder="Enter postcode (numbers only)"
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country Code
                      </label>
                      <input
                        type="text"
                        value={contactDetails.Address.CountryCode}
                        onChange={(e) =>
                          handleContactChange(
                            "address.CountryCode",
                            e.target.value
                          )
                        }
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm bg-gray-100"
                        placeholder="Auto-detected from location"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        International Code
                      </label>
                      <CountryDropdown
                        value={contactDetails.MobilePhone.InternationalCode}
                        onChange={(value) =>
                          handleContactChange("phone.InternationalCode", value)
                        }
                        type="dial"
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (Numbers only)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={contactDetails.MobilePhone.Number}
                        onChange={(e) => {
                          const numericValue = handleNumericInput(
                            e.target.value,
                            15
                          ); // Max 15 digits
                          handleContactChange("phone.Number", numericValue);
                        }}
                        className={getNumericValidationClass(
                          contactDetails.MobilePhone.Number
                        )}
                        placeholder="Enter phone number (numbers only)"
                        inputMode="numeric"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Email <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (Where your tickets will be sent.)
                        </span>
                      </label>
                      <input
                        type="email"
                        value={contactDetails.Email}
                        onChange={(e) =>
                          handleContactChange("email", e.target.value)
                        }
                        className={getEmailValidationClass(
                          contactDetails.Email
                        )}
                        placeholder="Enter the email where you'd like to receive your tickets."
                      />
                      {contactDetails.Email &&
                        !isValidEmail(contactDetails.Email) && (
                          <p className="text-red-500 text-xs mt-1">
                            Please enter a valid email address
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Billing Details Step
              <div className="bg-white rounded-md">
                <div className="bg-[#FFE4DB] p-3 rounded-t-md">
                  <h2 className="font-semibold font-jakarta">
                    Billing Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={sameAsContact}
                        onChange={(e) =>
                          handleSameAsContactChange(e.target.checked)
                        }
                        className="accent-[#EE5128]"
                      />
                      <span className="text-sm">Same as contact details</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Title
                      </label>
                      <select
                        value={billingDetails.Name.Title}
                        onChange={(e) =>
                          handleBillingChange("title", e.target.value)
                        }
                        disabled={sameAsContact}
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Name.NamePartList.NamePart[0]}
                        onChange={(e) =>
                          handleBillingChange("firstName", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Name.NamePartList.NamePart[0],
                                true
                              )
                        }
                        placeholder="Enter first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Name.NamePartList.NamePart[1]}
                        onChange={(e) =>
                          handleBillingChange("middleName", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Name.NamePartList.NamePart[1],
                                true
                              )
                        }
                        placeholder="Enter middle name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Name.NamePartList.NamePart[2]}
                        onChange={(e) =>
                          handleBillingChange("lastName", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Name.NamePartList.NamePart[2],
                                true
                              )
                        }
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Company}
                        onChange={(e) =>
                          handleBillingChange("address.Company", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.Company,
                                true
                              )
                        }
                        placeholder="Enter company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Flat/Apartment
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Flat}
                        onChange={(e) =>
                          handleBillingChange("address.Flat", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.Flat,
                                true
                              )
                        }
                        placeholder="Enter flat/apartment"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Building Name
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.BuildingName}
                        onChange={(e) =>
                          handleBillingChange(
                            "address.BuildingName",
                            e.target.value
                          )
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.BuildingName,
                                true
                              )
                        }
                        placeholder="Enter building name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Building Number
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.BuildingNumber}
                        onChange={(e) =>
                          handleBillingChange(
                            "address.BuildingNumber",
                            e.target.value
                          )
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.BuildingNumber,
                                true
                              )
                        }
                        placeholder="Enter building number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Street
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Street}
                        onChange={(e) =>
                          handleBillingChange("address.Street", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.Street,
                                true
                              )
                        }
                        placeholder="Enter street"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Locality
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Locality}
                        onChange={(e) =>
                          handleBillingChange(
                            "address.Locality",
                            e.target.value
                          )
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.Locality,
                                true
                              )
                        }
                        placeholder="Enter locality"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.City}
                        onChange={(e) =>
                          handleBillingChange("address.City", e.target.value)
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.City,
                                true
                              )
                        }
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Province/State
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Province}
                        onChange={(e) =>
                          handleBillingChange(
                            "address.Province",
                            e.target.value
                          )
                        }
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getFieldValidationClass(
                                billingDetails.Address.Province,
                                true
                              )
                        }
                        placeholder="Enter province/state"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Postcode <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-1">
                          (Numbers only)
                        </span>
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.Postcode}
                        onChange={(e) => {
                          if (!sameAsContact) {
                            const numericValue = handleNumericInput(
                              e.target.value,
                              10
                            ); // Max 10 digits
                            handleBillingChange(
                              "address.Postcode",
                              numericValue
                            );
                          }
                        }}
                        disabled={sameAsContact}
                        className={
                          sameAsContact
                            ? "w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100"
                            : getNumericValidationClass(
                                billingDetails.Address.Postcode
                              )
                        }
                        placeholder="Enter postcode (numbers only)"
                        inputMode="numeric"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country Code
                      </label>
                      <input
                        type="text"
                        value={billingDetails.Address.CountryCode}
                        onChange={(e) =>
                          handleBillingChange(
                            "address.CountryCode",
                            e.target.value
                          )
                        }
                        disabled={sameAsContact}
                        className="w-full border border-[#CCCCCC] rounded p-2 text-sm disabled:bg-gray-100 bg-gray-100"
                        placeholder="Auto-detected from location"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Details Section (only for traveller steps)
            {currentStep <= totalTravellers && (
              <div className="w-full bg-white rounded-md p-6 mt-6 font-sans">
                <h3 className="font-semibold text-black mb-1 font-jakarta">
                  {t("traveller-details.save-details.title")}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {t("traveller-details.save-details.description")}
                </p>
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="accent-[#EE5128] mt-[3px]"
                  />
                  <span className="text-sm">
                    {t("traveller-details.save-details.term")}
                  </span>
                </label>
              </div>
            )} */}

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-6 py-2 rounded font-semibold font-jakarta hover:bg-gray-600 active:bg-gray-700 transition-colors duration-200"
              >
                {currentStep === 1 ? "Cancel" : "Back"}
              </button>
              <button
                onClick={handleContinue}
                className={`px-6 py-2 rounded font-semibold font-jakarta transition-colors duration-200 ${
                  isCurrentStepValid().length > 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c]"
                }`}
                // Remove the disabled attribute to allow clicking for popup
              >
                {currentStep === totalTravellers + 2
                  ? t("continue-booking")
                  : "Continue"}
              </button>
            </div>
          </div>

          {/* Booking Details Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:max-w-[360px] order-1 lg:order-2">
            {/* Booking Details - First on mobile */}
            {location.state.tripType === "One Way" ? (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {/* {flight.departureTime} */}
                      {OutwardTicket.segments[0].departureTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket.segments[0].departureCity}
                    </p>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <p className="text-xs text-gray-500 mb-[2px]">
                      {parseInt(OutwardTicket.segments[0].duration) +
                        parseInt(OutwardTicket?.segments[1]?.duration || 0) +
                        "hr"}
                    </p>
                    <div className="flex items-center justify-center">
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="text-black text-sm">✈</span>
                      <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                      <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                    </div>
                    <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                      {OutwardTicket.segments[0].class}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[20px] font-bold font-jakarta">
                      {/* {flight.arrivalTime} */}
                      {OutwardTicket?.segments[1]
                        ? OutwardTicket?.segments[1].arrivalTime
                        : OutwardTicket?.segments[0].arrivalTime}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {OutwardTicket?.segments[1]
                        ? OutwardTicket.segments[1].arrivalCity
                        : OutwardTicket?.segments[0].arrivalCity}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between px-6 mt-6">
                  <div className="text-left w-1/2 border-r pr-4">
                    <p className="text-sm font-semibold text-black font-jakarta m">
                      {t("booking-details.departure")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px]">
                      {OutwardTicket?.segments[0].departureDate.split("-")[0]}
                    </p>
                  </div>
                  <div className="text-left w-1/2 pl-4">
                    <p className="text-sm font-semibold text-black font-jakarta ml-5">
                      {t("booking-details.landing")}
                    </p>
                    <p className="text-xs text-gray-500 mt-[2px] ml-5">
                      {OutwardTicket?.segments[0].arrivalDate.split("-")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex justify-around mt-6 text-sm font-medium font-jakarta">
                  <span>{t("booking-details.policy")}</span>
                  <span className="ml-10">{t("booking-details.refund")}</span>
                  <span>{t("booking-details.reschedule")}</span>
                </div>
              </div>
            ) : location.state.tripType === "Round Trip" ? (
              <div className="flex flex-col gap-6">
                <div className="max-w-[377px] w-full min-h-[280px] bg-white rounded-[12px] pb-4">
                  <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                    <h2 className="font-semibold text-[18px] font-jakarta">
                      {t("booking-details.title")}
                    </h2>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {OutwardTicket?.segments[0].departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket.segments[0].departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {parseInt(OutwardTicket.segments[0].duration) +
                          parseInt(OutwardTicket?.segments[1]?.duration || 0) +
                          "hr"}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {OutwardTicket.segments[0].class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {OutwardTicket?.segments[1]
                          ? OutwardTicket?.segments[1].arrivalTime
                          : OutwardTicket?.segments[0].arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {OutwardTicket?.segments[1]
                          ? OutwardTicket.segments[1].arrivalCity
                          : OutwardTicket?.segments[0].arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {
                          (
                            OutwardTicket?.segments?.[1]?.departureDate ??
                            OutwardTicket?.segments?.[0]?.departureDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {
                          (
                            OutwardTicket?.segments?.[1]?.arrivalDate ??
                            OutwardTicket?.segments?.[0]?.arrivalDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-6 mt-[20px]">
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.departureTime} */}
                        {returnTicket?.segments[0].departureTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.segments[0].departureCity}
                      </p>
                    </div>
                    <div className="flex flex-col items-center relative">
                      <p className="text-xs text-gray-500 mb-[2px]">
                        {parseInt(returnTicket.segments[0].duration) +
                          parseInt(returnTicket?.segments[1]?.duration || 0) +
                          "hr"}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="text-black text-sm">✈</span>
                        <div className="border-t border-dashed w-8 border-gray-300 mx-2" />
                        <span className="w-[6px] h-[6px] bg-gray-300 rounded-full" />
                      </div>
                      <div className="mt-[6px] bg-green-600 text-white text-xs px-2 py-[2px] rounded">
                        {returnTicket.segments[0].class}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[20px] font-bold font-jakarta">
                        {/* {flight.arrivalTime} */}
                        {returnTicket.segments[1]
                          ? returnTicket?.segments[1].arrivalTime
                          : returnTicket?.segments[0].arrivalTime}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {returnTicket.segments[1]
                          ? returnTicket.segments[1].arrivalCity
                          : returnTicket.segments[0].arrivalCity}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between px-6 mt-6">
                    <div className="text-left w-1/2 border-r pr-4">
                      <p className="text-sm font-semibold text-black font-jakarta m">
                        {t("booking-details.departure")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px]">
                        {
                          (
                            returnTicket?.segments?.[1]?.departureDate ??
                            returnTicket?.segments?.[0]?.departureDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                    <div className="text-left w-1/2 pl-4">
                      <p className="text-sm font-semibold text-black font-jakarta ml-5">
                        {t("booking-details.landing")}
                      </p>
                      <p className="text-xs text-gray-500 mt-[2px] ml-5">
                        {
                          (
                            returnTicket?.segments?.[1]?.arrivalDate ??
                            returnTicket?.segments?.[0]?.arrivalDate
                          )?.split("-")[0]
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-[377px] w-full h-[280px] bg-white rounded-[12px]">
                <div className="bg-[#FFE4DB] p-3 rounded-t-[12px]">
                  <h2 className="font-semibold text-[18px] font-jakarta">
                    {t("booking-details.title")}
                  </h2>
                </div>

                <div className="flex justify-between items-center px-6 mt-[20px]">
                  Some thing error
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Validation Popup */}
      <ValidationPopup
        isOpen={showValidationPopup}
        errors={validationErrors}
        onClose={() => setShowValidationPopup(false)}
      />

      {/* Login/Guest Choice Popup */}
      <LoginGuestPopup
        isOpen={showLoginGuestPopup}
        onClose={() => setShowLoginGuestPopup(false)}
        onContinueAsGuest={handleContinueAsGuest}
        onAuthNavigation={handleAuthNavigation}
        isExistingUser={false} // Always false since we removed the user check
        isCheckingUser={isCheckingUser}
        userEmail={null}
      />

      {/* Login Form Popup */}
      <LoginFormPopup
        isOpen={showLoginForm}
        onClose={() => setShowLoginForm(false)}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onSignUpRedirect={handleSignUpRedirect}
        initialEmail={contactDetails.Email}
        error={loginError}
      />

      <SignUpFormPopup
        isOpen={showSignUpForm}
        onClose={() => setShowSignUpForm(false)}
        onSignUp={handleSignUp}
        onGoogleSignUp={handleGoogleSignUp}
        onLoginRedirect={handleLoginRedirect}
        initialEmail={contactDetails.Email}
        error={signUpError}
        travellerList={travellerList}
        contactDetails={contactDetails}
        billingDetails={billingDetails}
        onNavigateToSeatSelection={navigateToSeatSelection}
        isVerifyingOtp={isVerifyingOtp}
        setIsVerifyingOtp={setIsVerifyingOtp}
      />
    </div>
  );
}

export default TravelersDetails;

// Fixed SignUpFormPopup Component with local state management and cursor pointers
const SignUpFormPopup = ({
  isOpen,
  onClose,
  onSignUp,
  onGoogleSignUp,
  onLoginRedirect,
  initialEmail = "",
  error,
  // ✅ ADD these new props
  travellerList,
  contactDetails,
  billingDetails,
  onNavigateToSeatSelection,
  isVerifyingOtp,
  setIsVerifyingOtp,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [signUpUserData, setSignUpUserData] = useState(null);

  // LOCAL STATE - this prevents re-renders from parent
  const [signUpData, setSignUpData] = useState({
    name: "",
    phone: "",
    email: initialEmail,
    password: "",
  });

  // Update local state when popup opens with new initial email
  useEffect(() => {
    if (isOpen && initialEmail !== signUpData.email) {
      setSignUpData((prev) => ({
        ...prev,
        email: initialEmail,
      }));
    }
  }, [isOpen, initialEmail]);

  if (!isOpen) return null;

  // ✅ ADD this handleClose function here:
  const handleClose = () => {
    // Reset all states when closing
    setIsLoading(false);
    setShowEmailVerification(false);
    setShowSuccessMessage(false);
    setOtpCode(["", "", "", ""]);
    setOtpError("");
    setIsVerifyingOtp(false);
    setSignUpUserData(null);

    // Call the original onClose
    onClose();
  };

  // Function to handle numeric input for phone
  const handleNumericInput = (value, maxLength = null) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (maxLength && numericValue.length > maxLength) {
      return numericValue.slice(0, maxLength);
    }
    return numericValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Start loading
    setIsLoading(true);

    // Call the signup function passed from parent
    onSignUp(signUpData);

    // Simulate processing time and then show verification step
    setTimeout(() => {
      setShowEmailVerification(true);
      setIsLoading(false);
    }, 2000); // Show loader for 2 seconds
  };
  const handleBackToSignup = () => {
    setShowEmailVerification(false);
  };

  const handleNameChange = (e) => {
    setSignUpData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handlePhoneChange = (e) => {
    const numericValue = handleNumericInput(e.target.value, 15);
    setSignUpData((prev) => ({ ...prev, phone: numericValue }));
  };

  const handleEmailChange = (e) => {
    setSignUpData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordChange = (e) => {
    setSignUpData((prev) => ({ ...prev, password: e.target.value }));
  };
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(
        `input[name="otp-${index + 1}"]`
      );
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    let enteredOtp = otpCode.join("");

    if (enteredOtp.length !== 4) {
      setOtpError("Please enter all 4 digits");
      return;
    };
    try {
      const USER_API_URL =
        import.meta.env.VITE_USER_SERVICE_URL ||
        "http://localhost:3000/userapi";

      const res = await fetch(`${USER_API_URL}/validateotp`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signUpData.email,
          inputOtp: enteredOtp,
        }),
      });
      if (res.ok) {
        setShowSuccessMessage(true);
        setIsVerifyingOtp(false);
        return console.log("Navigation Logic");
      }
    } catch (error) {
      console.error(error);
      setIsVerifyingOtp(false);
      setOtpError("Invalid OTP. Please try again.");
    }
  };
  // Handle continue to seat selection
  // Handle continue to seat selection
  const handleContinueToSeatSelection = async () => {
    const finalData = {
      TravellerList: travellerList,
      ContactDetails: contactDetails,
      BillingDetails: billingDetails,
    };

    // if (!signUpUserData || !signUpUserData.userId) {
    //   console.error("No user data available");
    //   handleClose();
    //   return;
    // }
    onNavigateToSeatSelection(finalData, undefined);

    // Close all popups
    handleClose();

    // Navigate with actual user ID
    onNavigateToSeatSelection(finalData, signUpUserData.userId); // ✅ This should work now
  };
  return (
    <>
      {/* Premium Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-pointer"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        onClick={handleClose}
      >
        {/* Premium Modal */}
        <div
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 cursor-default"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: "premiumSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1)",
          }}
        >
          <style jsx>{`
            @keyframes premiumSlideIn {
              from {
                opacity: 0;
                transform: translateY(-20px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>

          {/* Header */}
          <div className="relative overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="relative px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.07a4.125 4.125 0 118.25 0v.07M16.5 17.25h.007v.008H16.5v-.008z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {showEmailVerification
                        ? "Verify Your Email"
                        : "Create New Account"}
                    </h3>
                    <p className="text-orange-100 text-sm mt-1">
                      {showEmailVerification
                        ? "Check your inbox to continue"
                        : "Join us to enjoy exclusive benefits"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-9 h-9 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 cursor-pointer"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-red-800 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}
            {showEmailVerification ? (
              // OTP Verification Steps
              <div className="space-y-4">
                {!showSuccessMessage ? (
                  // OTP Input Step
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-6 h-6 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>

                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        OTP Sent to Your Email
                      </h4>

                      <p className="text-sm text-gray-600 mb-6">
                        We've sent a 4-digit verification code to{" "}
                        <span className="font-semibold text-orange-600">
                          {signUpData.email}
                        </span>
                      </p>
                    </div>

                    {/* OTP Input Boxes */}
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-3">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            name={`otp-${index}`}
                            type="text"
                            inputMode="numeric"
                            maxLength="1"
                            value={otpCode[index]}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => {
                              // Handle backspace
                              if (
                                e.key === "Backspace" &&
                                !otpCode[index] &&
                                index > 0
                              ) {
                                const prevInput = document.querySelector(
                                  `input[name="otp-${index - 1}"]`
                                );
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
                            placeholder="0"
                          />
                        ))}
                      </div>

                      {otpError && (
                        <div className="text-center">
                          <p className="text-sm text-red-600 font-medium">
                            {otpError}
                          </p>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center"
                      >
                        "Verify OTP"
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleBackToSignup}
                          className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                          Back to Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Success Message Step
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        Account Successfully Created!
                      </h4>

                      <p className="text-sm text-gray-600 mb-6">
                        Welcome aboard! Your account has been verified and is
                        ready to use.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleContinueToSeatSelection}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Continue to Seat Selection
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Original Signup Form
              <>
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name and Phone in one row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={signUpData.name}
                        onChange={handleNameChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm cursor-text"
                        placeholder="Enter name"
                        autoComplete="name"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={signUpData.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm cursor-text"
                        placeholder="Phone number"
                        inputMode="numeric"
                        autoComplete="tel"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={signUpData.email}
                      onChange={handleEmailChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm cursor-text"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={signUpData.password}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white text-sm cursor-text"
                      placeholder="Create password"
                      autoComplete="new-password"
                      required
                      disabled={isLoading}
                    />
                    <p className="text-xs text-gray-500 mt-0.5">
                      Min 8 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center min-h-[48px]"
                  >
                    {isLoading ? (
                      <div className="flex flex-col items-center space-y-2">
                        {/* Grid Loader */}
                        <div className="grid grid-cols-3 gap-1">
                          {[...Array(9)].map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-white rounded-sm animate-pulse"
                              style={{
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: "1.2s",
                              }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          Creating your account...
                        </span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onGoogleSignUp}
                    disabled={isLoading}
                    className="w-full mt-4 bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-200 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Sign up with Google</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => onLoginRedirect(signUpData.email)}
                  className="font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-200 cursor-pointer"
                >
                  Login here
                </button>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>
                Your data is secure and encrypted with industry-standard
                protection
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
