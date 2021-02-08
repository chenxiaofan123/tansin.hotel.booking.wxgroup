const getters = {
    // leftNavStatus: (state) => state.common.leftNav,//左边菜单栏是否显示
    isShowFooterStatus: (state) => state.common.isShowFooter,//是否显示底部tab栏
    isSelected: (state) => state.common.selected,//选中
    isCommonurl: (state) => state.common.commonurl,//公共路径
    isContracturl: (state) => state.common.contracturl,//合同签署
    isOperator: (state) => state.common.operator,//运营商
    isJwtkey:(state) => state.common.jwtkey,//jwt key
    isApikey:(state) => state.common.apikey//api key
}
export default getters