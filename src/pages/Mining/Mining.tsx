import React, { useState, useEffect } from 'react';
import './mining.css'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Data from '../../apis/api/data.js'
import API from '../../apis/api/six.js'
import { useTranslation } from "react-i18next"
import title_name from "../../assets/images/nft/title-name.png"

const TitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const TitleSup = styled.span`
    font-size: 24px;
    color: #06DD7A;
`
const Directortitle = styled.div`
  font-size: 40px;
  font-family: HYChaoCuYuanJ;
  font-weight: 700;
  color: #722F0D;
  width:100%;
  height:40px;
  padding:0 10px;
  margin:10px 0;
  >img{
    width:100%;
  }
`
const Headerbox = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
//   padding:20px 0;
`
const Headername = styled.div`
  font-size: 28px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #722F0D;
  margin-top:10px;

`
// const ItemBtn = styled(NavLink)`
// text-decoration:none;
// color:#FFF;
// display:block;
// width:100%;
// height:100%;
// `


interface Item {
    pre_coin: string,
    next_coin: string,
    coin_name: string,
    coin: string,
    per_day: string | number,
    per_month: string | number,
    apy: string | number,
    tvl: string | number,
    poolIndex: string

}

const formatNum = function (str: string|number) {
    if(str*1<0) return 0
    str=""+str
    let flag = str.indexOf('.') > 0
    let temp

    if(flag){
        if( str.split('.')[0].length>4){
            let pre = str.split('.')[0]
            let next =  str.split('.')[1]
            temp =pre+'.'+next.substring(0,2)
        }
        else {
            let pre = str.split('.')[0]
            let next =  str.split('.')[1]
            temp =pre+'.'+next.substring(0,4)
        }
    } else   temp =str

    return temp
}
export default function Mining() {

const { t } = useTranslation()

    const [flag, setFlag] = useState(0)
    const [type, setType] = useState('main')
    const [mainList, setMainList] = useState({ 'main': [], 'ttq': []})
    // const [rate, setRate] = useState(0.00)
    // const [allBlock, setAllBock] = useState(0.00)
    // const [balance, setBalance] = useState(0.00)
    // 判断是否是第一次加载页面  判断发送请求
    // const [ pageFlag, setPageFlag ] = useState(false);
    const clickListener = () => {}
    // 如果是true 持续加载更新
    // if (pageFlag) {
    //     // console.log(pageFlag);
    //     setTimeout(() => {
    //         Data.getPoolListData().then(res => {
    //             // console.log(`getPoolListData =>`, res);
    //             setMainList(res)
    //             setPageFlag(false);
    //         })
    //         Data.getAllBlock().then(res=>{
    //             // console.log(`setAllBock`,res)
    //             setAllBock(res)
    //         })
    //         API.getWalletAllTrs().then(res => {
    //             // console.log(`setBalance`,res)
    //             setBalance(res)
    //         })
    //     }, 3000);
    // }

    const nav_type = [
        {
            text:t("mining.text22"),
            type: "main",
        },
        {
            text: 'TTQ',
            type: "ttq",
        },
    ]

    // {t("navlist.text01")}
    // const nav_list = [
    //     {
    //         text: t("mining.text05"),
    //         end_val: allBlock + " ",
    //         start_val: 0,
    //     },
    //     {
    //         text: t("mining.text06"),
    //         end_val: allBlock * rate + " ",
    //         start_val: 0,
    //     },
    //     {
    //         text: t("mining.text08"),
    //         end_val: "0",
    //         start_val: 0,
    //     },
    //     {
    //         text: t("mining.text04"),
    //         end_val: balance + " ",
    //         start_val: 0,
    //     },
    // ];

    useEffect(() => {
        let setTimeoutTimer;
        const timerFn = function () {
            console.log(777)
            Data.getPoolListData().then(res => {
                // console.log(`getPoolListData =>`, res);
                setMainList(res)
                // setPageFlag(false);
            })
            // Data.getAllBlock().then(res=>{
            //     // console.log(`setAllBock`,res)
            //     setAllBock(res)
            // })
            // API.getWalletAllTrs().then(res => {
            //     // console.log(`setBalance`,res)
            //     setBalance(res)
            // })

        }
        const timer = function () {
          setTimeoutTimer && clearTimeout(setTimeoutTimer)
          timerFn()
          setTimeoutTimer = setTimeout(() => {
            timer()
          }, 4000);
        }
        window.addEventListener("click", clickListener, false)
        timerFn()
        timer()
        return function () {
          window.removeEventListener("click", clickListener, false)
          setTimeoutTimer && clearTimeout(setTimeoutTimer)
        }
      }, [])

    // useEffect(() => {
    //     Data.getTrsRate().then(res => {
    //         setRate(res.rate)
    //     })
    //     // 判断 如果是false 每个方法请求一次 加载出页面
    //     if(!pageFlag) {
    //         Data.getPoolListData().then(res => {
    //             // console.log(`setMainList`, res);
    //             setMainList(res);
    //             setPageFlag(true);
    //         })
    //         Data.getAllBlock().then(res=>{
    //             // console.log(`setAllBock`, res)
    //             setAllBock(res)
    //         })
    //         API.getWalletAllTrs().then(res => {
    //             // console.log(`setBalance`, res)
    //             setBalance(res)
    //         })
    //     }
    // }, [pageFlag])
    return (
        <>
            {/* <Title /> */}
            {/* <TopContent rate={formatNum(rate)} nav_list={nav_list} /> */}
            {/* <Directortitle>
                <img src={title_name} alt="" />
            </Directortitle> */}
            <Headerbox>
                <img width="40" height="40" src={require('../../assets/images/home/nav-logo.png')} alt="" />
                <Headername>TTQSwap</Headername>
            </Headerbox>
            <MidTitle />
            <ul className="nav-ul">
                {
                    nav_type.map((item, index) => {
                        return (
                            <li key={item.type} onClick={() => {
                                setFlag(index)
                                setType(item.type)
                            }}
                                className={flag === index ? 'nav-li active' : 'nav-li'}>
                                {item.text}
                            </li>
                        )
                    })
                }
            </ul>
            {/* 原本的 */}
            {/* {
                type && mainList[type] && (<div className="pool-list">
                    {

                        mainList[type].map((item: Item) => {
                            return (
                                <>
                                    <div className="pool-item" key={item.coin_name}>
                                        <div className="item-img">
                                            <img src={item.pre_coin} alt="" className="pre" />
                                            <img src={item.next_coin} alt="" className="next" />
                                        </div>
                                        <p className="item-coin">{item.coin_name}</p>
                                        <p>
                                            <span>{t("mining.text17")} {item.coin}</span>
                                            <span className="item-span">{item.per_day}</span>
                                            <span>{t("mining.text14")}</span>
                                        </p>
                                        <p>
                                            <span>{t("mining.text07")} {item.coin}</span>
                                            <span className="item-span">{item.per_month}</span>
                                            <span>{t("mining.text16")}</span>
                                        </p>
                                        <div className="item-div">
                                            <span>APY</span>
                                            <span>{item.apy}</span>
                                        </div>
                                        <div className="item-div">
                                            <span>TVL</span>
                                            <span>{item.tvl}</span>
                                        </div>

                                        <div className="item-btn">
                                            <ItemBtn id={`/provideLiquidity-nav-link`} to={"/provideLiquidity/" + item.poolIndex}>{t("mining.text15")}</ItemBtn>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>)
            } */}
            {/* 更改后的 */}
            {
                type && mainList[type] && (
                    <div className="minList">
                        <div className="minHead">
                            <span className="headspant">{ t("mining.text18") }/TVL</span>
                            <span className="headspanm">TTQ</span>
                            <span className="headspanb">APY</span>
                        </div>
                        {
                            mainList[type].map((item: Item) => {
                                return (
                                    <NavLink id={`/provideLiquidity-nav-link`} to={"/provideLiquidity/" + item.poolIndex} className="minItem" key={item.coin_name}>
                                        <div className="minItemCol1">
                                            <div className="minItemColH">
                                                <div className="minItemImg">
                                                    {
                                                        item.coin_name.indexOf('USDT') == 0 && item.coin_name.indexOf('/') != -1 ?  (
                                                            <div>
                                                                <img src={ item.next_coin } alt="" />
                                                                <img src={ item.pre_coin } alt="" />
                                                            </div>
                                                        ): item.coin_name.indexOf('USDT') != 0 && item.coin_name.indexOf('/') != -1 ? (
                                                            <div>
                                                              <img src={ item.pre_coin } alt="" />
                                                                <img src={ item.next_coin } alt="" />   
                                                            </div>
                                                              
                                                        ) : item.coin_name.indexOf('USDT') == 0 && item.coin_name.indexOf('/') == -1 ? (
                                                            <div>
                                                                <img src={ item.pre_coin } alt="" />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <img src={ item.pre_coin } alt="" />
                                                            </div>
                                                        )
                                                    }
                                                    
                                                </div>
                                                <span>{  item.coin_name.indexOf('USDT') == 0 ? (item.coin_name.split('/')[1]+'/'+item.coin_name.split('/')[0]) : (item.coin_name) }</span>
                                            </div>
                                            <p>${ item.tvl }</p>
                                        </div>
                                        <div className="minItemCol2">
                                        {/* per_day 每月产量 */}
                                            <p>{ (item.per_day/30) }({ t("mining.text20") })</p>
                                            <p>{ (item.per_day*12) }({ t("mining.text21") })</p>
                                        </div>
                                        <div className="minItemCol3">
                                            <span>{ item.apy }</span>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

function Title() {
    const { t } = useTranslation();
    return (
        <>
            <TitleDiv>
                <TitleSup>{t("mining.text01")}</TitleSup>
            </TitleDiv>
        </>
    )
}

function TopContent(props) {
    const { t } = useTranslation();
    let { rate, nav_list } = props
    return (
        <>
            <div className="mini-top">
                <p className="title">{t("mining.text02")}</p>
                <div className="mini-1-div">
                    <p>
                        <span>{t("mining.text03")}</span>
                        <span>{rate}</span>
                    </p>
                </div>
                <div className="top-div">
                    {
                        nav_list.map((item) => {
                            return (
                                <>
                                    <div className="item" key={item.text}>
                                        <div className="text">{item.text}</div>
                                        <div className="balance">
                                            {
                                                formatNum(item.end_val)
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

function MidTitle() {
    const { t } = useTranslation();
    return (
        <>
            <div className="mid-title">
                <p className="mid-text">{t("mining.text09")}</p>
                <p className="mid-sub">{t("mining.text10")}</p>
            </div>
        </>
    )
}



