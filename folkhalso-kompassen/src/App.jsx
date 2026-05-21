import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  FaTint,
  FaHeartbeat,
  FaVial,
  FaWeight,
  FaSmile,
  FaWineGlassAlt,
  FaSmoking,
  FaRunning,
  FaUtensils,
} from "react-icons/fa";
import { MdAccessibilityNew } from "react-icons/md";

const C = {
  bg: "#f9f9f9",
  panel: "#ffffff",
  soft: "#f3f3f4",
  line: "#c2c6d3",
  text: "#1a1c1c",
  muted: "#424751",
  blue: "#0050A0",
  darkBlue: "#003976",
  lightBlue: "#DCE7F6",
  midBlue: "#80a7d0",
  orange: "#F05933",
  lightOrange: "#FCDED6",
  grey: "#e8e8e8",
};

const DropdownContext = createContext({
  openDropdownId: null,
  setOpenDropdownId: () => {},
});

const risks = [
  "Blodsocker",
  "Blodtryck",
  "Blodfetter",
  "BMI & midjemått",
  "Upplevd hälsa",
  "Alkohol",
  "Tobak/Nikotin",
  "Fysisk aktivitet",
  "Matvanor",
];

const riskIcons = {
  Blodsocker: FaTint,
  Blodtryck: FaHeartbeat,
  Blodfetter: FaVial,
  "BMI & midjemått": MdAccessibilityNew,
  "Upplevd hälsa": FaSmile,
  Alkohol: FaWineGlassAlt,
  "Tobak/Nikotin": FaSmoking,
  "Fysisk aktivitet": FaRunning,
  Matvanor: FaUtensils,
};

const municipalities = [
  "Bjurholm",
  "Dorotea",
  "Lycksele",
  "Nordmaling",
  "Malå",
  "Norsjö",
  "Robertsfors",
  "Skellefteå",
  "Sorsele",
  "Storuman",
  "Umeå",
  "Vilhelmina",
  "Vindeln",
  "Vännäs",
  "Åsele",
];
const ageOptions = ["40", "50", "60"];
const genderOptions = ["Man", "Kvinna"];
const base = Object.fromEntries(risks.map((r, i) => [r, 52 + ((i * 4) % 28)]));
const muniBase = {
  Bjurholm: 6,
  Dorotea: 5.6,
  Umeå: 5.2,
  Lycksele: 5,
  Malå: 4.7,
  Nordmaling: 4.5,
  Skellefteå: 4.3,
  Storuman: 4.1,
  Åsele: 3.8,
  Sorsele: 3.6,
  Vilhelmina: 3.4,
  Norsjö: 3.2,
  Vännäs: 3,
  Robertsfors: 2.9,
  Vindeln: 2.8,
};

const paths = [
  {
    name: "Vindeln",
    d: "M981.536 796.832L985.536 791.832L981.036 786.832L976.036 776.332L970.536 763.832L966.036 760.332L963.536 763.832L952.036 754.832L947.036 747.332L945.036 740.832L938.036 737.832L934.536 741.332L920.536 727.832H925.536L921.036 720.332L923.036 714.332L899.036 694.832L874.036 688.832L853.536 669.332L846.536 646.832L836.036 638.332L788.036 774.332L799.036 851.832L808.536 850.332L825.536 870.832L815.536 873.832L822.036 890.332H827.536L832.036 902.332H838.036L847.536 914.332L850.036 908.332L859.036 922.832L856.036 926.332L860.536 930.832L865.036 934.832L872.536 925.832H887.036L891.036 931.332L902.036 921.832L903.036 913.832H909.536L912.036 916.832L923.036 917.332L932.036 911.832L936.036 894.832L940.536 897.332L943.036 892.332L948.536 895.832L952.536 893.832L958.036 900.832L965.536 901.332L966.536 890.832H967.536L969.036 897.332L970.536 896.332L971.536 885.332L970.536 874.332L981.536 859.832L980.036 855.332L987.036 845.332L984.036 830.332L977.036 833.832L970.536 830.832L972.536 813.832L979.536 807.332L989.036 804.832L981.536 796.832Z",
  },
  {
    name: "Bjurholm",
    d: "M744.536 1013.83L756.036 1022.83L768.536 1002.83L782.036 1001.33L795.536 1018.33L806.036 1009.83L811.036 1018.33L819.036 1019.33L821.536 1014.83L832.536 1016.83L842.536 1028.83L849.036 1022.83L853.536 1022.33L854.536 1016.83L859.536 1017.83L859.036 1008.33L870.036 1017.33L875.536 1015.83L875.036 1000.83L888.036 995.332L879.036 950.832L871.536 940.832C867.936 938.032 859.036 930.332 855.036 926.832L858.536 923.332L850.036 908.832L847.536 915.332L838.036 902.832H831.536L827.036 890.832H822.536L814.536 897.832L805.036 891.332L805.536 903.332L799.536 905.332L752.536 921.332L690.536 944.332L699.036 954.832L696.536 965.832H693.036C688.236 965.832 687.702 968.499 688.036 969.832L690.536 977.332C692.536 981.332 696.536 989.632 696.536 990.832C696.536 992.032 698.202 997.332 699.036 999.832L712.036 1007.83L733.036 1008.83L737.536 1015.33L744.536 1013.83Z",
  },
  {
    name: "Dorotea",
    d: "M97.0356 554.832H62.0356L66.0356 566.332L75.5356 574.332L76.5356 585.332L86.5356 594.332L88.5356 601.332L96.0356 607.332L106.536 610.832L115.536 624.832L119.036 633.832V641.332L120.036 648.332L133.536 650.332L145.536 656.332L153.036 662.832L164.536 678.332L169.536 683.332V689.832L157.536 694.332V698.832L165.036 700.832L177.036 715.832L185.536 716.832L188.036 726.332L204.036 738.832L211.036 766.332L211.536 769.832L222.536 768.332L221.036 740.832L231.036 734.832L235.536 756.832L237.536 783.332L251.036 788.832L259.036 796.832L284.536 812.832L286.036 838.832L289.536 844.832L301.536 840.832H319.536L429.036 959.332L433.536 962.832L444.036 944.332L432.536 933.332L429.036 920.332L407.536 858.332L412.036 857.332L399.536 841.832L395.536 830.332V818.332L408.536 808.832L397.536 790.832L386.036 776.332L362.536 766.832L341.036 755.332L308.536 730.332L265.536 656.832L181.036 588.332L97.0356 554.832Z",
  },
  {
    name: "Åsele",
    d: "M444.536 944.332L433.536 962.832L498.536 978.332L574.036 988.332L646.536 958.332L702.536 939.332L757.536 918.832L651.036 806.832L663.036 802.332V787.832L652.536 783.832L631.036 789.832L617.536 787.832L611.536 777.832L595.536 761.332L583.536 749.332L593.036 741.832L586.036 734.332L573.036 747.332V752.332L566.036 758.332L523.036 770.832L511.536 767.832L510.536 774.832L447.036 794.332L439.536 809.832L408.536 809.332L396.036 818.332V830.332L399.536 841.832L412.036 857.332L408.036 858.832L433.536 933.332L444.536 944.332Z",
  },
  {
    name: "Vilhelmina",
    d: "M62.5356 372.332L29.0356 355.832L30.0356 428.332L9.03564 451.332L0.535645 503.332L50.5356 551.332L61.7175 554.832H97.5356L181.536 588.332L197.036 600.332L230.536 626.832L266.536 656.832L276.536 673.332L297.536 709.832L309.036 729.832L316.536 735.332L342.536 755.332L364.536 767.332L387.536 776.832L409.536 808.332L439.536 809.332L447.036 794.332L510.536 774.332L511.036 767.332L522.536 770.332L566.036 758.332L572.536 752.332V747.332L577.036 743.332L561.536 711.332L568.536 700.332L565.536 696.832L564.536 684.332L553.036 680.832L547.036 684.332L540.536 667.332L548.036 657.332L542.536 651.332L511.036 649.832L510.536 637.832L382.536 539.332L301.536 422.332L237.036 384.332L165.036 380.332L149.536 373.832L137.036 381.332L108.036 377.332L99.5356 369.332L77.0356 375.332L62.5356 372.332Z",
  },
  {
    name: "Storuman",
    d: "M33.5356 301.832L29.0356 355.332L62.0356 372.332L78.0356 375.832L100.036 369.832L108.536 377.832L137.036 381.832L150.036 374.332L165.536 380.332L237.036 385.332L302.536 423.332L382.536 539.832L511.036 637.332V649.332L543.036 650.832L549.036 657.332L582.036 621.832L579.036 615.332L609.036 581.832L603.536 550.832L613.536 533.832L593.036 511.832L595.536 508.332L585.536 498.332L581.536 499.832L565.036 483.332L510.036 449.332L458.536 425.832L427.036 402.832L383.036 355.832L366.036 322.332L206.536 216.332L116.036 82.332L32.0356 90.332L36.0356 122.832L43.0356 163.832V185.332L51.0356 222.832L36.0356 265.832L33.5356 301.832Z",
  },
  {
    name: "Nordmaling",
    d: "M769.036 1003.33L756.536 1022.83V1027.83L771.536 1025.33L780.036 1033.33L778.536 1043.83H785.536L817.536 1093.83L819.036 1103.33L828.036 1129.83L835.036 1142.83L837.036 1142.33V1144.83L838.536 1148.33L842.036 1149.33L843.536 1151.33L847.536 1154.33L848.536 1150.83L850.036 1144.83L851.536 1144.33V1147.83L853.536 1146.83L857.036 1145.83L861.536 1149.33L862.036 1151.33L861.036 1152.33L859.036 1153.33V1155.33L861.036 1156.33L862.036 1158.83H864.036L863.536 1162.33H867.536L869.036 1164.33L870.036 1166.08L871.536 1167.83L873.036 1166.08L871.536 1161.33L871.036 1157.83H874.036V1156.83L872.036 1155.83L870.036 1153.33V1150.83L868.036 1149.33L865.536 1146.33L864.536 1148.83L862.536 1147.33L864.036 1144.33L863.036 1139.83L865.536 1142.83L867.536 1141.83L869.036 1139.33L873.036 1136.83L872.036 1132.83L869.036 1133.83V1134.83L865.536 1135.33V1130.83L864.036 1131.33L861.536 1129.33L861.036 1125.33L857.536 1123.83L859.536 1121.33H861.536L863.536 1120.83V1118.33L860.536 1115.33V1112.83L861.536 1111.83L861.036 1109.33L861.536 1106.33L862.536 1105.33L866.536 1104.83L868.536 1106.33L869.536 1110.33L870.036 1108.83L872.536 1110.33V1113.83H873.536L874.036 1115.83L875.536 1120.33L877.536 1118.83L879.036 1121.83L882.536 1120.33L885.036 1121.83L884.536 1131.83L887.536 1129.83L888.536 1130.33L885.536 1134.83L887.536 1135.83V1140.33L889.036 1140.83L891.536 1142.33V1145.33L892.036 1151.83L894.036 1149.33L897.036 1159.33L900.536 1153.83H905.036L909.536 1145.83L910.536 1153.33L912.536 1145.83L915.036 1147.33L919.036 1145.83L918.036 1139.33L916.536 1144.33L915.036 1143.33L914.036 1138.33L912.536 1132.33L909.036 1129.83L908.536 1119.83L913.036 1121.83L914.036 1117.83L916.536 1119.33V1116.83L919.036 1117.33V1114.83L920.536 1111.33L921.536 1113.33L923.536 1111.83L925.536 1112.83L926.036 1108.33H929.036L921.536 1096.33L927.036 1094.83V1084.33L930.536 1079.33L934.036 1046.33L924.036 1037.33L916.036 1021.33L906.536 1020.33C900.136 1019.13 890.202 1004.17 886.036 996.832L875.536 1001.33L876.036 1016.33L870.036 1017.83L859.036 1009.33L859.536 1017.33H854.536V1022.83H849.536L842.536 1029.83L831.536 1016.83L821.536 1015.33L819.036 1018.83H811.036L806.036 1010.33L795.536 1018.83L781.536 1001.83L769.036 1003.33Z",
  },
  {
    name: "Sorsele",
    d: "M194.536 27.832L116.036 82.332L206.536 216.332L322.536 293.832L367.036 322.332L382.536 355.332L396.536 370.332L429.036 404.332L461.036 427.332L513.036 450.832L565.536 484.332L581.536 499.832L585.536 498.332L596.036 508.332L593.036 511.832L605.036 525.332L616.536 537.332L626.536 531.332L620.536 525.332L616.536 523.832L648.536 453.832L668.036 382.832L661.036 338.332L649.536 326.332L648.536 319.832L643.036 318.832V313.832L635.536 311.332L630.536 317.832L623.536 315.332V308.332L593.536 300.332L563.036 285.832L410.536 131.832L369.536 122.332L242.036 23.332L189.036 0.832031L194.536 27.832Z",
  },
  {
    name: "Malå",
    d: "M674.536 352.332L661.536 339.832L668.036 382.332L647.536 456.832L669.036 467.832L714.036 516.832L724.036 518.832V528.332L750.036 555.832L852.036 491.332L847.536 485.332L845.536 479.832L838.036 472.332L828.036 465.832L829.036 456.832L830.536 448.832L818.536 439.332L810.036 435.332L803.536 429.332L791.036 426.832L789.536 418.332L775.536 412.332L767.036 402.332H759.036L756.036 396.832L751.536 394.832L744.036 386.832V380.332L739.036 375.332L717.036 374.332L706.536 370.332L703.536 359.832L690.536 351.332L674.536 352.332Z",
  },
  {
    name: "Lycksele",
    d: "M617.036 523.832L647.536 456.832L669.036 467.832L714.536 517.332L723.536 519.332L724.036 528.832L750.536 556.832L839.536 622.832L836.036 636.832L788.036 775.332L798.536 852.332L808.536 850.832L824.536 870.832L815.036 873.332L822.536 892.332L814.536 896.832L804.536 890.332L805.036 902.832L758.536 918.832L651.536 806.332L663.536 801.832V787.832L652.536 783.332L631.536 789.332L618.036 787.832L611.036 776.832L584.036 749.332L593.036 740.832L585.536 734.332L577.036 742.832L562.036 711.332L569.036 700.832L565.536 696.832L564.536 683.832L553.036 679.832L547.036 683.832L541.036 667.332L548.536 657.832L582.536 622.332L579.536 615.332L609.536 582.332L604.036 550.332L613.536 534.332L616.536 537.832L627.536 531.832L621.536 525.332L617.036 523.832Z",
  },
  {
    name: "Norsjö",
    d: "M851.536 491.832L750.536 556.332L839.536 623.332L835.036 636.332L842.536 642.832L851.036 649.332L861.036 645.832L867.036 632.332L903.536 644.832L927.036 642.832L955.536 677.832L978.036 674.832L978.536 669.332L965.536 658.332L967.536 653.332L963.536 647.832L976.036 628.332H980.536V617.832L976.036 613.832L980.536 609.832H992.536L990.036 605.832L992.536 601.832L980.536 595.332V589.332L966.036 574.332L970.036 567.332L954.536 551.832L923.536 533.832L900.536 496.332L904.036 491.832L886.036 473.332L872.036 481.832L863.536 489.332L851.536 491.832Z",
  },
  {
    name: "Skellefteå",
    d: "M886.536 473.332L937.536 398.332L984.536 418.832L1090.54 467.832L1166.54 484.332L1173.04 492.332L1213.04 526.832L1208.54 524.832L1209.54 527.832L1204.54 526.332L1198.54 522.832L1197.04 529.332L1201.54 534.332L1206.04 534.832L1213.54 533.332L1216.54 535.332L1214.04 539.832L1208.04 544.832H1198.04L1191.04 544.332L1184.04 540.832L1190.54 549.832L1188.54 552.832L1185.04 553.332L1181.54 558.832L1186.04 563.332V566.832L1183.04 568.832L1176.54 565.832L1165.04 571.332L1161.54 575.332L1166.54 581.332L1161.54 585.832L1164.54 588.832L1169.54 590.332L1173.54 597.332L1173.04 599.832L1170.54 601.332L1167.54 598.332L1164.54 600.332L1161.04 595.332L1156.54 591.332L1157.04 594.832L1160.04 596.832L1158.04 597.832L1160.04 604.832H1158.54L1157.54 607.332L1155.04 606.332L1153.54 604.332L1150.54 604.832L1149.54 607.332V624.832L1148.04 625.832L1146.04 625.332L1145.54 622.832L1142.04 620.832L1140.04 620.832L1137.04 617.832V615.832L1133.04 610.332V603.832L1128.54 607.332L1126.04 608.332L1127.54 610.332L1125.04 611.832L1123.04 613.332L1129.04 620.332L1139.54 628.332L1144.54 633.332L1143.04 634.832L1137.04 633.832L1134.04 632.332L1135.04 634.832L1145.54 639.832L1153.54 640.832L1155.04 638.832L1165.54 639.332L1168.54 641.332L1169.04 644.832L1174.04 650.832L1162.54 652.332L1158.54 654.332L1169.04 670.332H1172.04L1173.04 675.832L1170.54 677.832L1161.54 676.832L1152.04 669.332L1150.04 665.832L1146.54 669.332L1149.04 675.832L1147.54 675.832L1152.08 682.438L1147.54 682.332L1143.54 677.832V673.332L1143.04 669.832L1139.54 673.332V676.832L1142.54 681.832L1153.54 684.832L1160.04 687.332L1163.04 690.332L1162.04 691.832L1159.04 695.832L1164.54 698.832L1163.54 701.832L1161.54 703.832L1163.04 706.332L1170.54 706.332L1173.04 708.332L1173.54 713.832L1180.54 717.332L1181.04 714.332L1180.54 712.332L1177.04 707.832H1181.54L1184.04 710.332L1186.04 707.832L1188.54 711.832L1192.54 721.832L1196.04 725.332L1198.04 715.832L1199.04 715.332L1203.04 718.332L1204.04 719.832V723.832L1203.54 725.832L1200.54 726.332L1203.04 730.332L1206.04 734.332H1210.54L1213.54 733.332L1216.04 736.832V741.332L1214.54 741.832L1211.04 738.832L1209.04 741.832L1208.04 744.832L1205.54 743.332L1201.54 737.832L1201.04 732.832L1198.54 729.832L1195.54 732.832L1193.04 736.332L1191.04 738.832V740.832L1192.04 743.332L1198.54 741.832L1201.54 741.832L1202.54 743.332L1202.04 751.332L1202.54 759.332L1201.04 763.832L1203.54 768.332L1208.54 768.832L1209.54 763.832V761.832L1212.54 757.832H1213.54L1215.54 762.332V764.332L1216.54 766.332L1219.04 765.832L1220.54 763.332L1219.04 754.832L1221.04 757.332L1224.54 764.832L1226.54 767.832L1227.04 770.332L1224.04 772.832H1221.04L1218.54 773.832L1216.54 778.332L1214.54 780.832L1209.54 781.832L1208.54 784.832L1206.04 789.332L1205.54 792.832L1203.04 794.832L1201.54 800.332L1200.04 804.832L1198.54 806.332L1194.04 806.332L1193.04 804.332L1191.04 804.832L1191.54 808.332V815.332L1187.04 818.332L1184.04 813.832L1183.54 817.832L1179.04 820.332V825.832L1179.04 827.832L1177.04 825.832L1174.54 823.832L1173.04 825.832L1168.04 818.332L1170.04 809.332L1161.04 796.832L1150.04 805.832L1139.54 796.832L1135.04 783.332L1113.04 763.332L1104.54 772.332L1099.04 768.832V773.832H1092.04V784.832L1086.04 785.332L1078.04 800.332L1082.04 804.332L1071.54 804.832L1065.04 811.832L1067.04 822.332L1059.04 815.332L1049.04 812.832L1057.04 820.332L1055.04 822.832L1045.54 816.332L1041.54 818.332L1034.04 813.332H1014.04L1001.04 804.832L990.536 790.832L981.036 787.832L970.536 764.332L963.036 765.332L948.036 751.332L945.536 741.332L938.036 737.832L934.036 741.332L921.036 728.332H926.036L921.036 720.832L923.036 714.832L899.036 695.332L874.036 689.332L853.536 669.332L847.036 647.332L860.536 645.832L866.536 631.832L902.036 644.332L926.036 642.832L954.536 677.832L978.036 674.832V667.832L966.036 657.832L967.536 652.332L964.036 646.832L975.536 628.832L980.036 627.832L980.536 616.332L975.536 613.332L980.036 609.332H993.036L990.036 605.332L992.536 601.332L981.036 595.332V589.832L966.036 573.832L969.536 567.832L952.036 549.832L923.536 533.832L900.036 496.332L904.036 492.332L886.536 473.332Z",
  },
  {
    name: "Vännäs",
    d: "M873.036 926.332L865.536 935.332L872.036 940.832L880.036 950.832L882.036 960.832C884.036 971.832 888.536 993.932 888.536 994.332C888.536 994.732 886.536 995.832 886.536 997.332C889.869 1002.17 899.059 1014.93 902.536 1017.83C904.536 1019.5 912.036 1022.33 917.536 1021.83L922.036 1019.83L926.036 1029.83L931.036 1028.83L932.036 1017.33L940.036 1016.33L952.536 1003.33L966.036 998.832V992.832L955.036 991.332L947.536 981.832L955.536 967.332H963.036L962.536 963.832L952.036 955.332L961.536 929.832L959.036 916.332L951.036 914.832L945.536 912.832L937.536 912.332L932.536 911.832L923.036 917.832L911.036 916.332L909.036 914.332H903.036L902.036 922.332L890.536 932.332L886.536 926.332H873.036Z",
  },
  {
    name: "Robertsfors",
    d: "M1171.04 831.832L1173.54 826.832L1168.04 817.832L1169.54 809.332L1161.04 797.832L1149.54 806.332L1139.54 797.332L1134.54 783.832L1113.04 764.332L1104.54 773.332L1099.54 769.832L1098.54 774.332H1092.54V785.832L1086.54 785.332L1078.54 800.332L1083.04 804.832L1071.04 805.332L1065.04 811.832L1067.54 823.332L1059.04 815.832L1050.04 813.332L1057.54 820.832L1055.04 823.332L1046.04 817.332L1042.04 818.332L1034.54 814.332H1014.54L1021.04 837.332L1037.04 867.332L1046.04 884.332L1056.54 896.332L1059.04 908.332L1065.04 913.332L1067.04 909.832L1089.04 952.332L1080.04 986.332L1086.04 988.332V984.332L1089.04 978.832V962.332L1093.54 964.332L1096.04 961.332L1099.04 958.832C1098.7 958.165 1097.94 956.732 1097.54 956.332C1097.14 955.932 1097.7 955.165 1098.04 954.832L1100.54 948.969L1102.54 949.832L1104.04 950.332L1105.54 948.969C1105.87 948.423 1106.64 947.232 1107.04 946.832C1107.44 946.432 1107.87 945.332 1108.04 944.832C1107.2 945.165 1105.54 945.732 1105.54 945.332V943.832V941.832C1105.87 941.665 1106.74 941.193 1107.54 940.638C1108.54 939.944 1109.04 938.332 1109.54 937.832C1109.94 937.432 1109.37 936.665 1109.04 936.332V933.332C1108.2 932.332 1106.64 930.332 1107.04 930.332C1107.54 930.332 1107.04 929.832 1107.54 929.332C1108.04 928.832 1107.04 927.832 1107.04 927.332C1107.04 926.932 1106.04 925.832 1105.54 925.332L1104.04 923.832H1108.54C1109.04 923.832 1110.24 923.732 1111.04 923.332C1112.04 922.832 1112.54 922.332 1113.04 921.332C1113.54 920.332 1113.54 919.332 1113.54 918.832V918.832C1113.54 918.332 1113.04 916.832 1112.54 916.832C1112.04 916.832 1112.04 914.332 1111.54 913.832C1111.14 913.432 1111.7 911.665 1112.04 910.832L1114.04 910.332L1115.54 908.332L1117.04 902.832L1116.04 899.332L1117.04 895.332L1113.54 893.832L1118.04 886.332C1118.37 885.999 1119.04 885.232 1119.04 884.832V883.332C1119.04 882.832 1118.54 881.832 1118.54 881.332C1118.54 880.932 1119.54 880.832 1120.04 880.832L1122.54 881.332L1126.54 879.832L1128.54 877.332L1131.04 872.832L1132.04 865.832H1133.54L1136.04 862.832C1136.2 862.499 1136.44 861.532 1136.04 860.332C1135.64 859.132 1135.2 858.165 1135.04 857.832V855.332L1137.54 857.832L1140.04 861.832L1143.04 864.332H1145.04L1146.54 857.832H1147.54C1148.04 857.165 1149.14 855.732 1149.54 855.332C1149.94 854.932 1150.37 853.832 1150.54 853.332L1153.54 851.332L1150.54 850.332L1152.04 846.332L1154.04 843.832H1157.04L1159.04 841.832L1157.04 839.832C1157.7 839.665 1159.04 839.232 1159.04 838.832C1159.04 838.432 1159.7 835.999 1160.04 834.832V832.832L1163.04 831.832L1164.54 829.332L1165.54 826.832L1164.04 823.832L1165.54 819.832L1167.54 825.832V829.832L1171.04 831.832Z",
  },
  {
    name: "Umeå",
    d: "M933.536 1097.31L927.036 1109.31L921.536 1098.81L925.536 1095.31V1087.31L929.536 1080.31L931.036 1072.31L933.536 1049.31L922.536 1037.31L916.036 1023.81L921.536 1020.31L925.536 1030.81L930.536 1029.81L931.036 1018.31L940.036 1016.81L953.036 1003.31L965.536 998.813L966.536 992.813L954.536 991.813L948.036 981.813L955.036 967.813H963.036L962.536 963.813L952.036 955.313L961.536 930.313L958.536 915.813L949.536 914.313L944.536 912.313H937.536L933.036 911.832L936.536 895.332L940.536 897.332L943.036 892.832L948.218 896.125L952.536 894.332L958.036 901.832H966.036L966.536 891.332H967.536L968.536 897.832L971.036 896.832L972.036 886.332L971.536 874.093L982.036 859.813L980.536 854.332L987.536 845.851L984.536 829.332L976.536 833.832L971.036 830.332L973.036 814.332L980.036 807.853L990.536 805.332L982.536 796.832L986.536 791.832L984.536 789.332L990.036 790.832L1000.04 804.832L1013.54 814.332L1021.04 837.832L1045.04 882.832L1056.54 896.832L1058.54 908.832L1065.04 914.332L1067.04 910.832L1089.04 954.313L1082.04 976.313L1079.54 987.813L1085.04 990.813L1083.04 994.313L1079.54 995.313L1077.54 998.813V1002.81L1074.54 1006.81L1073.54 1001.81L1065.54 1000.81V1009.31L1073.54 1011.31L1068.54 1015.81L1104.54 1014.81L1126.54 1015.81L1112.54 1024.81L1113.54 1034.81V1038.81V1049.31L1111.54 1057.81L1101.54 1072.31L1093.04 1082.31L1087.54 1097.31L1076.04 1103.31L1068.54 1019.81L1064.54 1024.31C1061.87 1021.15 1056.44 1014.81 1056.04 1014.81C1055.64 1014.81 1054.87 1015.48 1054.54 1015.81L1051.54 1018.81C1050.7 1018.48 1048.94 1017.81 1048.54 1017.81C1048.04 1017.81 1048.04 1020.81 1048.04 1021.81C1048.04 1022.81 1048.54 1027.31 1049.04 1029.31C1049.54 1031.31 1050.04 1031.81 1050.54 1032.31C1051.04 1032.81 1050.54 1035.31 1050.54 1036.31C1050.54 1037.31 1049.54 1037.31 1049.04 1037.81C1048.64 1038.21 1048.2 1039.98 1048.04 1040.81C1048.54 1041.15 1049.74 1041.91 1050.54 1042.31C1051.34 1042.71 1050.87 1044.15 1050.54 1044.81V1048.31C1050.04 1048.15 1048.84 1047.71 1048.04 1047.31C1047.04 1046.81 1044.54 1046.81 1044.04 1045.81C1043.54 1044.81 1044.04 1041.81 1044.04 1040.81C1044.04 1040.01 1043.7 1038.15 1043.54 1037.31V1034.81C1043.37 1033.98 1043.04 1032.21 1043.04 1031.81C1043.04 1031.41 1041.37 1030.98 1040.54 1030.81L1043.04 1029.81V1024.81V1017.81C1042.7 1016.98 1042.04 1015.21 1042.04 1014.81C1042.04 1014.41 1041.04 1013.65 1040.54 1013.31L1040.04 1010.81L1038.54 1006.81H1037.54L1036.54 1009.31L1038.54 1011.31L1037.54 1015.81V1021.81L1033.04 1031.81L1027.04 1041.81L1028.54 1045.81L1026.54 1055.81L1025.54 1059.31L1024.04 1060.81L1022.54 1055.81L1021.54 1058.31L1023.04 1064.81L1020.54 1068.81C1019.7 1068.81 1018.04 1068.11 1018.04 1065.31C1018.04 1062.51 1017.04 1063.15 1016.54 1063.81L1015.54 1060.81H1013.54L1012.04 1065.31H1010.54V1063.81C1011.04 1063.15 1012.04 1061.61 1012.04 1060.81V1057.81L1010.54 1052.81L1013.54 1051.81L1019.04 1049.31C1018.37 1048.48 1016.94 1046.81 1016.54 1046.81C1016.14 1046.81 1014.37 1044.48 1013.54 1043.31L1012.04 1040.81L1010.54 1037.31L1009.04 1031.81L1007.04 1024.81V1038.81H1004.04L1001.04 1040.81V1044.31L1004.04 1041.81C1004.37 1043.15 1005.04 1046.01 1005.04 1046.81C1005.04 1047.61 1007.7 1050.48 1009.04 1051.81C1008.7 1053.98 1007.94 1058.51 1007.54 1059.31C1007.04 1060.31 1005.54 1062.81 1005.04 1062.81C1004.64 1062.81 1006.2 1065.48 1007.04 1066.81V1073.81L1001.04 1076.31V1073.81L999.036 1072.31C998.369 1071.48 996.936 1069.41 996.536 1067.81C996.136 1066.21 996.369 1063.81 996.536 1062.81L995.036 1059.81L990.036 1074.31L983.536 1073.81L978.036 1076.31L976.036 1075.81C974.702 1076.31 972.036 1077.21 972.036 1076.81C972.036 1076.31 970.036 1074.81 970.036 1074.31C970.036 1073.91 969.036 1072.81 968.536 1072.31L967.036 1068.81H963.536L959.536 1070.31L955.036 1072.31L953.536 1074.81L953.036 1082.31L955.536 1088.81L956.536 1092.81C955.369 1092.98 952.936 1093.31 952.536 1093.31C952.136 1093.31 950.369 1092.98 949.536 1092.81L949.036 1090.81L946.036 1091.81L945.036 1088.81L942.536 1087.31L940.536 1093.31L938.536 1095.31L937.536 1089.81L933.536 1097.31Z",
  },
];

function Dropdown({ label, value, options, onChange, small = false }) {
  const [open, setOpen] = useState(false);
  const { openDropdownId, setOpenDropdownId } = useContext(DropdownContext);
  const id = useMemo(() => Symbol(label), [label]);
  const selectedLabel = value || label;

  useEffect(() => {
    if (open && openDropdownId !== id) {
      setOpen(false);
    }
  }, [id, open, openDropdownId]);

  if (!options) {
    return (
      <button
        type="button"
        className={small ? "dropdownButton small" : "dropdownButton"}
      >
        <span>{label}</span>
        <FiChevronDown className="dropdownArrow" />
      </button>
    );
  }

  return (
    <div className={small ? "dropdown small" : "dropdown"}>
      <button
        type="button"
        className="dropdownButton"
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          setOpenDropdownId(nextOpen ? id : null);
        }}
      >
        <span className={value ? "dropdownValue" : "dropdownPlaceholder"}>
          {selectedLabel}
        </span>
        <FiChevronDown
          className={open ? "dropdownArrow open" : "dropdownArrow"}
        />
      </button>

      {open && (
        <div className="dropdownMenu">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={
                value === option ? "dropdownOption active" : "dropdownOption"
              }
              onClick={() => {
                onChange(option);
                setOpen(false);
                if (openDropdownId === id) {
                  setOpenDropdownId(null);
                }
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
const impactStages = [
  { value: -2, label: "påtaglig försämring", tone: "bad" },
  { value: -1, label: "mild försämring", tone: "bad" },
  { value: 0, label: "nuläge", tone: "neutral" },
  { value: 1, label: "mild förbättring", tone: "good" },
  { value: 2, label: "påtaglig förbättring", tone: "good" },
];

function RiskChips({ selected, setSelected, single = false }) {
  return (
    <div className="chips">
      {risks.map((r) => (
        <button
          key={r}
          onClick={() =>
            single
              ? setSelected([r])
              : setSelected(
                  selected.includes(r)
                    ? selected.filter((x) => x !== r)
                    : [...selected, r],
                )
          }
          className={selected.includes(r) ? "chip active" : "chip"}
        >
          <span>{r}</span>
        </button>
      ))}
    </div>
  );
}
function ImpactStageChips({ value, onChange }) {
  return (
    <div className="stageChips">
      {impactStages.map((stage) => {
        const active = value === stage.value;
        return (
          <button
            key={stage.value}
            type="button"
            onClick={() => onChange(stage.value)}
            className={`stageChip${active ? ` active ${stage.tone}` : ""}`}
          >
            {stage.label}
          </button>
        );
      })}
    </div>
  );
}
function MapFilter({ selected, setSelected, mapImpact, setMapImpact }) {
  const [mapAge, setMapAge] = useState("");
  const [mapGender, setMapGender] = useState("");

  return (
    <section className="card mapFilter">
      <div className="headingInfo">
        <p>Filter</p>
        <InfoButton
          label="Information om kartfilter"
          text="Här väljer du ålder, kön, riskfaktor och simuleringsnivå för kartvyn. Valen påverkar färger och värden i kartan."
        />
      </div>

      <div className="mapFilterLayout">
        <div className="mapFilterDropdowns">
          <div className="mapFilterField">
            <span className="label">ÅLDER</span>
            <Dropdown
              label="Alla"
              value={mapAge}
              options={ageOptions}
              onChange={setMapAge}
            />
          </div>
          <div className="mapFilterField">
            <span className="label">KÖN</span>
            <Dropdown
              label="Alla"
              value={mapGender}
              options={genderOptions}
              onChange={setMapGender}
            />
          </div>
        </div>

        <div className="mapFilterControls">
          <p className="label">Välj en riskfaktor</p>
          <RiskChips selected={selected} setSelected={setSelected} single />

          <div className="mapStageSection">
            <p className="label">Välj simuleringsnivå</p>
            <ImpactStageChips value={mapImpact} onChange={setMapImpact} />
          </div>
        </div>
      </div>
    </section>
  );
}
function FiltersPanel({
  age,
  setAge,
  gender,
  setGender,
  municipality1,
  setMunicipality1,
  municipality2,
  setMunicipality2,
  selected,
  setSelected,
}) {
  const municipality2Options =
    municipality1 && municipality1 !== ""
      ? municipalities.filter((m) => m !== municipality1)
      : municipalities;

  return (
    <div className="card filter">
      <div className="cardHead">
        <h3>Filter</h3>
        <InfoButton
          label="Information om filter"
          text="Här väljer du målgrupp och kommuner som ska jämföras. Riskfaktorerna styr vilka reglage och diagram som visas."
        />
      </div>
      <div className="ddgrid">
        <div>
          <span className="label">ÅLDER</span>
          <Dropdown
            label="Alla"
            value={age}
            options={ageOptions}
            onChange={setAge}
          />
        </div>
        <div>
          <span className="label">KÖN</span>
          <Dropdown
            label="Alla"
            value={gender}
            options={genderOptions}
            onChange={setGender}
          />
        </div>
        <div className="dropdownKommun">
          <span className="label">JÄMFÖR KOMMUNER</span>
          <div>
            <Dropdown
              label="Kommun 1"
              value={municipality1}
              options={municipalities}
              onChange={setMunicipality1}
            />
            <Dropdown
              label="Kommun 2"
              value={municipality2}
              options={municipality2Options}
              onChange={setMunicipality2}
            />
          </div>
        </div>
      </div>
      <div className="riskFilterHeader">
        <p className="label">Välj riskfaktorer att simulera</p>

        <button
          type="button"
          className="selectAllButton"
          onClick={() =>
            selected.length === risks.length
              ? setSelected([])
              : setSelected(risks)
          }
        >
          {selected.length === risks.length ? "Avmarkera alla" : "Välj alla"}
        </button>
      </div>

      <RiskChips selected={selected} setSelected={setSelected} />
    </div>
  );
}
const navItems = [
  { key: "start", label: "Startsida", icon: "dashboard" },
  { key: "prognos", label: "Prognos", icon: "query_stats" },
  { key: "karta", label: "Karta", icon: "map" },
];

function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>Folkhälsokompassen</h2>
        <p>För simulering av risk för kardiovaskulära sjukdomar</p>
      </div>
      {navItems.map((item) => (
        <button
          className={page === item.key ? "nav active" : "nav"}
          onClick={() => setPage(item.key)}
          key={item.key}
        >
          <span className="material-symbols-rounded navIcon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </aside>
  );
}

function InfoButton({ text, label = "Information" }) {
  return (
    <button type="button" className="infoButton" aria-label={label}>
      i<span className="infoTooltip">{text}</span>
    </button>
  );
}

function MunicipalityToggle({
  municipality1,
  municipality2,
  activeMunicipality,
  setActiveMunicipality,
}) {
  const disabled = !municipality1 || !municipality2;
  return (
    <div className={`municipalityToggle${disabled ? " disabled" : ""}`}>
      <button
        type="button"
        className={activeMunicipality === "municipality1" ? "active" : ""}
        disabled={disabled}
        onClick={() => setActiveMunicipality("municipality1")}
      >
        {municipality1 || "Kommun 1"}
      </button>
      <button
        type="button"
        className={activeMunicipality === "municipality2" ? "active" : ""}
        disabled={disabled}
        onClick={() => setActiveMunicipality("municipality2")}
      >
        {municipality2 || "Kommun 2"}
      </button>
    </div>
  );
}

function getSliderTrackBackground(value) {
  const percent = ((value + 2) / 4) * 100;

  if (value === 0) {
    return { background: "#DCE7F6" };
  }

  if (value > 0) {
    return {
      background: `linear-gradient(to right, #DCE7F6 0%, #DCE7F6 50%, #003976 50%, #003976 ${percent}%, #DCE7F6 ${percent}%, #DCE7F6 100%)`,
    };
  }

  return {
    background: `linear-gradient(to right, #DCE7F6 0%, #DCE7F6 ${percent}%, #003976 ${percent}%, #003976 50%, #DCE7F6 50%, #DCE7F6 100%)`,
  };
}

function SliderCard({ risk, value, onChange }) {
  const Icon = riskIcons[risk];

  const label =
    value === 0
      ? "nuläge"
      : value === -1
        ? "mild"
        : value === 1
          ? "mild"
          : "påtaglig";

  const bubbleClass =
    value < 0 ? "bubble bad" : value > 0 ? "bubble good" : "bubble";

  return (
    <div className="card slider">
      <div className="cardHead">
        <div className="sliderCardTitle">
          {Icon && (
            <Icon
              className={`sliderCardIcon ${
                risk === "BMI & midjemått" ? "bmiIcon" : ""
              }`}
            />
          )}
          <h3>{risk}</h3>
        </div>

        <InfoButton
          label={`Information om ${risk}`}
          text={`${risk} påverkar den simulerade riskprofilen. Dra reglaget åt vänster för försämring och åt höger för förbättring.`}
        />
      </div>

      <div className="sliderTrackWrap">
        <div
          className={`${bubbleClass} bubbleValue${value}`}
          style={{ left: `${((value + 2) / 4) * 100}%` }}
        >
          {label}
        </div>

        <input
          type="range"
          min="-2"
          max="2"
          step="1"
          value={value}
          onChange={(e) => onChange(risk, Number(e.target.value))}
          style={getSliderTrackBackground(value)}
        />

        <div className="rangeLabels">
          <span>Försämring</span>
          <span>Förbättring</span>
        </div>
      </div>
    </div>
  );
}
function Spider({
  selected,
  valuesByMunicipality,
  municipality1,
  municipality2,
}) {
  const size = 360,
    c = 180,
    r = 125,
    axes = selected.length ? selected : risks;
  const municipalityAdjustment1 = (muniBase[municipality1] || 3) * 3;
  const municipalityAdjustment2 = (muniBase[municipality2] || 3) * 3;
  const values1 = valuesByMunicipality.municipality1;
  const values2 = valuesByMunicipality.municipality2;
  const poly = (values, off = 0) =>
    axes
      .map((a, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
        const val = Math.max(10, Math.min(95, base[a] + values[a] * 9 + off));
        return `${c + (Math.cos(ang) * r * val) / 100},${c + (Math.sin(ang) * r * val) / 100}`;
      })
      .join(" ");
  return (
    <div className="card">
      <div className="headingInfo">
        <h3>Riskprofil</h3>
        <InfoButton
          label="Information om riskprofil"
          text="Riskprofilen visar de valda riskfaktorerna i ett radardiagram."
        />
      </div>
      <svg viewBox="0 0 360 360" className="chartSvg">
        {[0.25, 0.5, 0.75, 1].map((x) => (
          <circle key={x} cx={c} cy={c} r={r * x} fill="none" stroke={C.line} />
        ))}
        {axes.map((a, i) => {
          const ang = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
          return (
            <g key={a}>
              <line
                x1={c}
                y1={c}
                x2={c + Math.cos(ang) * r}
                y2={c + Math.sin(ang) * r}
                stroke={C.line}
              />
              <text
                x={c + Math.cos(ang) * (r + 28)}
                y={c + Math.sin(ang) * (r + 28)}
                textAnchor="middle"
                fontSize="10"
              >
                {a}
              </text>
            </g>
          );
        })}
        <polygon
          points={poly(values1, municipalityAdjustment1)}
          fill={C.lightBlue}
          stroke={C.blue}
          strokeWidth="2"
          opacity=".75"
        />
        <polygon
          points={poly(values2, municipalityAdjustment2)}
          fill={C.lightOrange}
          stroke={C.orange}
          strokeDasharray="5 4"
          strokeWidth="2"
          opacity=".55"
        />
      </svg>
      <div className="legend">
        <div className="legendItem">
          <div
            className="marker solid"
            style={{ backgroundColor: C.blue }}
          ></div>
          {municipality1}
        </div>
        <div className="legendItem">
          <div
            className="marker dashed"
            style={{ borderColor: C.orange }}
          ></div>
          {municipality2}
        </div>
      </div>
    </div>
  );
}
function Lives({
  selected,
  valuesByMunicipality,
  year,
  setYear,
  municipality1,
  municipality2,
}) {
  const yrs = [2026, 2030, 2035, 2040, 2045, 2050, 2055, 2060];
  const impact1 = selected.reduce(
    (s, r) =>
      s +
      Math.max(0, valuesByMunicipality.municipality1[r]) * 12 -
      Math.min(0, valuesByMunicipality.municipality1[r]) * 5,
    0,
  );
  const impact2 = selected.reduce(
    (s, r) =>
      s +
      Math.max(0, valuesByMunicipality.municipality2[r]) * 12 -
      Math.min(0, valuesByMunicipality.municipality2[r]) * 5,
    0,
  );
  const base1 = muniBase[municipality1] || 3;
  const base2 = muniBase[municipality2] || 3;
  const pts = yrs.map((y, i) => ({
    y,
    a: Math.round(i * 20 + (impact1 * i) / 3 + base1 * 5),
    b: Math.round(i * 12 + (impact2 * i) / 5 + base2 * 3),
  }));
  const max = Math.max(120, ...pts.map((p) => Math.max(p.a, p.b)));
  const x = (i) => 38 + i * 70,
    y = (v) => 300 - (v / max) * 240,
    line = (k) => pts.map((p, i) => `${x(i)},${y(p[k])}`).join(" ");
  return (
    <div className="card">
      <div className="split">
        <div className="titleWithInfo">
          <h3>Prognos</h3>
          <InfoButton
            label="Information om räddade liv"
            text="Diagrammet visar en prognos över hur många liv som kan påverkas över tid baserat på valda riskfaktorer och simulerade förändringar."
          />
        </div>
        <Dropdown
          label="År"
          value={String(year)}
          options={yrs.map(String)}
          onChange={(value) => setYear(Number(value))}
          small
        />
      </div>
      <svg viewBox="0 0 560 330" className="chartSvg">
        <line x1="38" y1="300" x2="530" y2="300" stroke={C.muted} />
        <line x1="38" y1="300" x2="38" y2="20" stroke={C.muted} />
        {yrs.map((yr, i) => (
          <text key={yr} x={x(i)} y="318" fontSize="10" textAnchor="middle">
            {yr}
          </text>
        ))}
        <polyline
          points={line("a")}
          fill="none"
          stroke={C.blue}
          strokeWidth="3"
        />
        <polyline
          points={line("b")}
          fill="none"
          stroke={C.orange}
          strokeDasharray="6 6"
          strokeWidth="2"
        />
      </svg>
      <div className="legend">
        <div className="legendItem">
          <div
            className="marker solid"
            style={{ backgroundColor: C.blue }}
          ></div>
          {municipality1}
        </div>
        <div className="legendItem">
          <div
            className="marker dashed"
            style={{ borderColor: C.orange }}
          ></div>
          {municipality2}
        </div>
      </div>
    </div>
  );
}
function Start() {
  return (
    <main className="main center">
      <div className="hero">
        <p className="eyebrow">Demovy</p>
        <h1>Folkhälsokompassen</h1>
        <p>
          Ett prototypverktyg för att visa hur ändringar i riskfaktorer kan
          påverka framtida kardiovaskulär sjukdomsrisk i Västerbottens kommuner.
        </p>
      </div>
    </main>
  );
}
function emptyRiskValues() {
  return Object.fromEntries(risks.map((r) => [r, 0]));
}

function Prognos() {
  const [selected, setSelected] = useState(risks);
  const [valuesByMunicipality, setValuesByMunicipality] = useState({
    municipality1: emptyRiskValues(),
    municipality2: emptyRiskValues(),
  });
  const [activeMunicipality, setActiveMunicipality] = useState("municipality1");
  const currentValues = valuesByMunicipality[activeMunicipality];
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [municipality1, setMunicipality1] = useState("");
  const [municipality2, setMunicipality2] = useState("");
  const [year, setYear] = useState(2050);
  const update = (r, v) =>
    setValuesByMunicipality((prev) => ({
      ...prev,
      [activeMunicipality]: {
        ...prev[activeMunicipality],
        [r]: v,
      },
    }));

  const resetActiveMunicipality = () =>
    setValuesByMunicipality((prev) => ({
      ...prev,
      [activeMunicipality]: emptyRiskValues(),
    }));

  return (
    <main className="main">
      <section className="panel">
        <div className="top">
          <h3>Simuleringspanel</h3>
          <div className="panelActions">
            <MunicipalityToggle
              municipality1={municipality1}
              municipality2={municipality2}
              activeMunicipality={activeMunicipality}
              setActiveMunicipality={setActiveMunicipality}
            />
            <button onClick={resetActiveMunicipality} className="ghost">
              ↺ Återställ
            </button>
          </div>
        </div>
        <div className="simGrid">
          <FiltersPanel
            age={age}
            setAge={setAge}
            gender={gender}
            setGender={setGender}
            municipality1={municipality1}
            setMunicipality1={setMunicipality1}
            municipality2={municipality2}
            setMunicipality2={setMunicipality2}
            selected={selected}
            setSelected={setSelected}
          />
          <div className="sliders">
            {selected.map((r) => (
              <SliderCard
                key={r}
                risk={r}
                value={currentValues[r]}
                onChange={update}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bottom">
        <Spider
          selected={selected}
          valuesByMunicipality={valuesByMunicipality}
          municipality1={municipality1}
          municipality2={municipality2}
        />
        <Lives
          selected={selected}
          valuesByMunicipality={valuesByMunicipality}
          year={year}
          setYear={setYear}
          municipality1={municipality1}
          municipality2={municipality2}
        />
      </section>
    </main>
  );
}
function Karta() {
  const [selected, setSelected] = useState(["Blodtryck"]);
  const [hovered, setHovered] = useState("Umeå");
  const [mapImpact, setMapImpact] = useState(0);
  const factor = selected[0];
  const handleMapRiskChange = (nextSelected) => {
    setSelected(nextSelected);
    setMapImpact(0);
  };
  const data = useMemo(
    () =>
      municipalities
        .map((m, i) => ({
          name: m,
          value: Math.max(
            1.4,
            Math.min(
              6.4,
              (muniBase[m] || 3) +
                (risks.indexOf(factor) - 4) * 0.12 +
                Math.sin(i) * 0.25 +
                mapImpact * 0.3,
            ),
          ),
        }))
        .sort((a, b) => b.value - a.value),
    [factor, mapImpact],
  );
  const active = data.find((d) => d.name === hovered) || data[0];
  const fillFor = (n) => {
    const v = data.find((d) => d.name === n)?.value || 0;
    if (n === hovered) return C.blue;
    if (v >= 4.6) return C.midBlue;
    if (v >= 3.2) return C.lightBlue;
    return C.grey;
  };
  return (
    <main className="main">
      <MapFilter
        selected={selected}
        setSelected={handleMapRiskChange}
        mapImpact={mapImpact}
        setMapImpact={setMapImpact}
      />
      <section className="mapPanel">
        <div className="mapLeft">
          <div className="top">
            <div>
              <div className="titleWithInfo">
                <h2>Västerbotten – {factor}</h2>
                <InfoButton
                  label="Information om kartan"
                  text="Kartan visar Västerbottens kommuner och färglägger dem efter det simulerade värdet för vald riskfaktor. Hovra eller klicka på en kommun för att se detaljer."
                />
              </div>
              <p className="mapInfo">
                Hovra över kartan eller staplarna för att jämföra kommuner.
              </p>
            </div>
          </div>
          <div className="mapBox">
            <div className="stat">
              <b>{hovered}</b>
              <span>{active.value.toFixed(1)}%</span>
            </div>
            <svg viewBox="0 0 1228 1169" preserveAspectRatio="xMidYMid meet">
              {paths.map((p) => (
                <path
                  key={p.name}
                  d={p.d}
                  fill={fillFor(p.name)}
                  stroke={hovered === p.name ? C.darkBlue : C.muted}
                  strokeWidth={hovered === p.name ? 3 : 1.4}
                  onMouseEnter={() => setHovered(p.name)}
                  onClick={() => setHovered(p.name)}
                />
              ))}
            </svg>
            <div className="mapLegend">
              <div className="mapLegendTitle">Värden</div>
              <div className="mapLegendRow">
                <span
                  className="mapLegendSwatch"
                  style={{ background: C.midBlue }}
                />
                <span>4.6–6%</span>
              </div>
              <div className="mapLegendRow">
                <span
                  className="mapLegendSwatch"
                  style={{ background: C.lightBlue }}
                />
                <span>3.2–4.6%</span>
              </div>
              <div className="mapLegendRow">
                <span
                  className="mapLegendSwatch"
                  style={{ background: C.grey }}
                />
                <span>0–3.2%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bars">
          <div className="headingInfo">
            <h2>Kommun</h2>
            <InfoButton
              label="Information om kommunlistan"
              text="Listan rangordnar kommunerna efter aktuellt simulerat värde. Du kan hovra eller klicka på en kommun för att markera den i kartan."
            />
          </div>
          {data.map((d) => (
            <button
              key={d.name}
              onMouseEnter={() => setHovered(d.name)}
              onClick={() => setHovered(d.name)}
              className={hovered === d.name ? "barRow active" : "barRow"}
            >
              <span>{d.name}</span>
              <i>
                <b style={{ width: `${(d.value / 6.4) * 100}%` }} />
              </i>
              <em>{d.value.toFixed(1)}%</em>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
export default function App() {
  const [page, setPage] = useState("prognos");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <DropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
      <div className="app">
        <Sidebar page={page} setPage={setPage} />
        {page === "start" ? (
          <Start />
        ) : page === "prognos" ? (
          <Prognos />
        ) : (
          <Karta />
        )}
      </div>
    </DropdownContext.Provider>
  );
}
