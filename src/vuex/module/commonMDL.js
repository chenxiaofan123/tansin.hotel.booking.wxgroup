
import {
    // SET_LEFT_NAV,
    V_FOOTER,
    V_FOOTER_SEL,
    COMMON_URL,
    CONTRACT_URL,
    OPERATOR_URL,
    JWT_KEY,
    API_KEY
} from '../types/allTYPES'//公共状态获取


const common = {
    state:{
        leftNav:false,
        isShowFooter:true,
        selected:'',
        commonurl:'',
        contracturl:'',
        operator:'',
        jwtkey:'',
        apikey:'',
    },
    mutations:{
        /**
         * 设置用户角色
         */
        // [SET_LEFT_NAV](state, leftNav){
        //     state.leftNav = leftNav
        // },
        [V_FOOTER](state, isShow){
            state.isShowFooter = isShow
        },
        [V_FOOTER_SEL](state, selectedName){
            state.selected = selectedName
        },
        [COMMON_URL](state, url){
            state.commonurl = url
        },
        [CONTRACT_URL](state, url){
            state.contracturl = url
        },
        [OPERATOR_URL](state, url){
            state.operator = url
        },
        [JWT_KEY](state, key){
            state.jwtkey = key
        },
        [API_KEY](state, key){
            state.apikey = key
        }
    },
    actions:{
        // setLeftNav({commit},leftNav){
        //     commit(SET_LEFT_NAV,leftNav)
        // },
        setIsShowFooter({commit},isShow){
            commit(V_FOOTER,isShow)
        },
        setSelected({commit},selectedName){
            commit(V_FOOTER_SEL,selectedName)
        },
        setCommonurl({commit},url){
            commit(COMMON_URL,url)
        },
        setContracturl({commit},url){
            commit(CONTRACT_URL,url)
        },
        setOperator({commit},url){
            commit(OPERATOR_URL,url)
        },
        setJwtkey({commit},key){
            commit(JWT_KEY,key)
        },
        setApikey({commit},key){
            commit(API_KEY,key)
        }
    }
}
export default common;