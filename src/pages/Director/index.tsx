// import React,{ Fragment } from "react";
import React, { useState, useEffect } from 'react';

import { useTranslation } from "react-i18next"
import styled from 'styled-components'

import Data from '../../apis/api/data.js'
import API from '../../apis/api/six.js'

import './index.css'

const Approvediv = styled.div`
    padding:10px 20px;
    background-color:#fff;
    color:#000;
    position: fixed;
    top:30%;
    left:50%;
    border-radius:10px;
    box-shadow: 0px 0px 6px #ccc;
    font-size:14px;
    line-height:20px;
    text-align:center;
    z-index:2999;
    transform: translateX(-50%);
`

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
    } else{
        if(str.length > 4){
            temp = str+'.00'
        }else{
            temp = str+'.0000'
        }
        
    }   
    return temp
}

const formattingDate = function (getdate :string|number){
    let date = new Date(getdate)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let newmonth = month > 10 ? month : `0${month}`
    let newday = day > 10 ? day : `0${day}`
    let newdate = `${year}-${newmonth}-${newday}`
    return newdate
}

let timers

export default function Director() {
    const { t } = useTranslation();
    const [rate, setRate] = useState(0)
    const [allBalance, setAllBalance] = useState(0)
    const [addFlagtype,setAddFlagtype] = useState('')
    const [allBlock, setAllBock] = useState(0.00)
    const [isApprovediv, setApprovediv] = useState(false) // 授权/非授权 isApprovedivdao
    const [text, settext] = useState(false)//弹窗提示
    const [balance, setBalance] = useState(0.00)
    //7
    const [dao7name, setDao7Name] = useState('TRS DAO-7')
    const [dao7TotalSupply, setDao7TotalSupply] = useState('0.00')
    const [dao7BalanceOf, setDao7BalanceOf] = useState('0.00')
    const [allAvailableAmount7, setallAvailableAmount7] = useState('0.00')
    const [Dao7RestBlocks,setDao7RestBlocks] = useState('')
    const [isApprove7, setApprove7] = useState(false) // 授权/非授权
    const [Dao7CanWithdraw,setDao7CanWithdraw] = useState(false) //是否可以提取
    const [pengingApprove7, setPengingApprove7] = useState(false)//是否授权成功

    //15
    const [dao15name, setDao15Name] = useState('TRS DAO-15')
    const [dao15TotalSupply, setDao15TotalSupply] = useState('0.00')
    const [dao15BalanceOf, setDao15BalanceOf] = useState('0.00')
    const [allAvailableAmount15, setallAvailableAmount15] = useState('0.00')
    const [Dao15RestBlocks,setDao15RestBlocks] = useState('')
    const [Dao15CanWithdraw,setDao15CanWithdraw] = useState(false) //是否可以提取
    const [pengingApprove15, setPengingApprove15] = useState(false)//是否授权成功
    const [isApprove15, setApprove15] = useState(false) // 授权/非授权


    //30 
    const [daoname, setDaoName] = useState('TRS DAO-30')
    const [daoTotalSupply, setDaoTotalSupply] = useState('0.00')
    const [daoBalanceOf, setDaoBalanceOf] = useState('0.00')
    const [allAvailableAmount, setallAvailableAmount] = useState('0.00')
    const [isApprove, setApprove] = useState(false) // 授权/非授权
    const [DaoRestBlocks,setDaoRestBlocks] = useState('')
    const [DaoCanWithdraw,setDaoCanWithdraw] = useState(false) //是否可以提取
    const [pengingApprove, setPengingApprove] = useState(false)//是否授权成功


    const [addFlag, setAddFlag] = useState(false)   //显示隐藏 抵押解押弹框
    const [popType, setType] = useState('extract')    //当前弹框类型 extract/提取    Lockup/锁仓
    const [inputValue, setInputVal] = useState('0')   //input的值
    const [stakedLp, setStakedLp] = useState('0.00')
    const clickListener = () => {
    }
    const approveFn = (type) => {
        setPengingApprove7(true)
        setPengingApprove(true)
        setPengingApprove15(true)
        if(type == '7'){
            API.approveDao7().then(res => {
            }).catch(error => {
                setPengingApprove7(false)
                console.log('失败')

            })
        }else if(type == '30'){

            API.approveDao().then(res => {
            }).catch(error => {
                setPengingApprove(false)
                console.log('失败')

            })
        }else if(type == '15'){

            API.approveDao15().then(res => {
            }).catch(error => {
                setPengingApprove15(false)
                console.log('失败')

            })
        }
        
        
    }
    useEffect(() => {
        let setTimeoutTimer;
        const timerFn = function () {
            API.isApproveDao().then(res => {
                // console.log("是否授权" + res)
                setApprove(res)
            })
            API.isApproveDao7().then(res => {
                // console.log("是否授权" + res)
                setApprove7(res)
            })
            API.isApproveDao15().then(res => {
                // console.log("是否授权" + res)
                setApprove15(res)
            })
            // API.isApproveDao60().then(res => {
            //     // console.log("是否授权" + res)
            //     setApprove(res)
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

    const toast = (type) => {
        if(type == 'extract'){
            settext(true)
        }else{
            settext(false)
        }
        setApprovediv(true)
        timers && clearTimeout(timers)
        timers = setTimeout(() => {
            setApprovediv(false)
            clearTimeout(timers)
        }, 2000);
    }
    //7
    API.getDao7Name().then(res => {
        // console.log("Name =>",res)
        setDao7Name(res)
    })
    API.getDao7TotalSupply().then(res => {
        // console.log("总量 =>",res)
        setDao7TotalSupply(res)
    })
    API.getDao7BalanceOf().then(res => {
        // console.log("锁仓 =>",res)
        setDao7BalanceOf(res)
    })
    API.getDao7allAvailableAmount().then(res => {
        // console.log("解锁 =>",res)
        setallAvailableAmount7(res)
    })
    API.getDao7RestBlocks().then(res => {
        let newtime = '00'
        if (res != '0') {
            newtime = formattingDate(new Date().getTime() + res * 3 *1000)
        }else{
            newtime = "00"
        }
        setDao7RestBlocks(newtime)
    })
    API.getDao7CanWithdraw().then(res => {
        // console.log("是否可以领取 =>",res)
        setDao7CanWithdraw(res)
    })
    //15
    API.getDao15Name().then(res => {
        // console.log("Name =>",res)
        setDao15Name(res)
    })
    API.getDao15TotalSupply().then(res => {
        // console.log("总量 =>",res)
        setDao15TotalSupply(res)
    })
    API.getDao15BalanceOf().then(res => {
        // console.log("锁仓 =>",res)
        setDao15BalanceOf(res)
    })
    API.getDao15allAvailableAmount().then(res => {
        // console.log("解锁 =>",res)
        setallAvailableAmount15(res)
    })
    API.getDao15RestBlocks().then(res => {
        let newtime = '00'
        if (res != '0') {
            newtime = formattingDate(new Date().getTime() + res * 3 *1000)
        }else{
            newtime = "00"
        }
        setDao15RestBlocks(newtime)
    })
    API.getDao15CanWithdraw().then(res => {
        // console.log("是否可以领取 =>",res)
        setDao15CanWithdraw(res)
    })
    //30
    API.getDaoName().then(res => {
        // console.log("Name =>",res)
        setDaoName(res)
    })
    API.getDaoTotalSupply().then(res => {
        // console.log("总量 =>",res)
        setDaoTotalSupply(res)
    })
    API.getDaoBalanceOf().then(res => {
        // console.log("锁仓 =>",res)
        setDaoBalanceOf(res)
    })
    API.getDaoallAvailableAmount().then(res => {
        // console.log("解锁 =>",res)
        setallAvailableAmount(res)
    })
    API.getDaoRestBlocks().then(res => {
        let newtime = '00'
        if (res != '0') {
            newtime = formattingDate(new Date().getTime() + res * 3 *1000)
        }else{
            newtime = "00"
        }
        setDaoRestBlocks(newtime)
    })
    API.getDaoCanWithdraw().then(res => {
        // console.log("是否可以领取 =>",res)
        setDaoCanWithdraw(res)
    })

    //trs价格
    Data.getTrsRate().then(res => {
        setRate(res.rate)
    })
    //当前流动性质押
    Data.getPoolListData('all').then(res => {
        setAllBalance(res)
    })
    //当前挖矿产出
    Data.getAllBlock().then(res=>{
        // console.log(`setAllBock`,res)
        setAllBock(res)
    })
    API.getWalletAllTrs().then(res => {
        // console.log(`setBalance`,res)
        setBalance(res)
        setStakedLp(res)
    })
    
    // 提取
    function extract(type) {
        if(type == '30' && DaoCanWithdraw){
            API.DaoWithdraw().then(res => {
                // console.log("提取成功 =》",res)
            })
        }else if(type == '7' && Dao7CanWithdraw){
            API.Dao7Withdraw().then(res => {
                // console.log("提取成功 =》",res)
            })
        }else if(type == '15' && Dao15CanWithdraw){
            API.Dao15Withdraw().then(res => {
                // console.log("提取成功 =》",res)
            })
        }else{
             toast('extract')
        }
    }
    return (
        <>
            <div className="driectorList">
            {isApprovediv && (
                       text ? <Approvediv>{t("director.text17")}</Approvediv> : <Approvediv>{t("director.text18")}</Approvediv>
                    )}
                <div className="driectorItem">
                    <div className="driectorTitle">
                        <img src={ require('../../assets/images/price-icon-defalt-png.png') } alt="" />
                        <span>{t("director.text01")}</span>
                    </div>
                    <p className="driectorContent">${ formatNum(rate) }</p>
                </div>
                <div className="driectorItem">
                    <div className="driectorTitle">
                        <img src={ require('../../assets/images/Pledge-icon-defalt-png.png') } alt="" />
                        <span>{t("director.text02")}</span>
                    </div>
                    <p className="driectorContent">${allBalance}</p>
                </div>
                <div className="driectorItem">
                    <div className="driectorTitle">
                        <img src={ require('../../assets/images/mining-icon-defalt-png.png') } alt="" />
                        <span>{t("director.text03")}</span>
                    </div>
                    <p className="driectorContent"> ${formatNum(allBlock)}</p>
                </div>
                <div className="driectorItem">
                    <div className="driectorTitle">
                        <img src={ require('../../assets/images/value-icon-defalt-png.png') } alt="" />
                        <span>{t("director.text04")}</span>
                    </div>
                    <p className="driectorContent">${formatNum(allBlock*rate)}</p>
                </div>
            </div>
            {/* 7天 */}
            <div className="driectorBox">
                <img width="64px" height="64px" src={ require('../../assets/images/trs-icon-defalt-png.png') } alt="" />
                <p className="driectorBoxP1">{dao7name}</p>
                <p className="driectorBoxP2">APY 365%</p>
                {/* <p className="driectorBoxP2"></p> */}
                <div className="driectorBoxList">
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/lock-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text05")}：</span>
                        <span>{formatNum(dao7TotalSupply)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/mine-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text06")}：</span>
                        <span>{formatNum(dao7BalanceOf)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text07")}：</span>
                        <span>{formatNum(allAvailableAmount7)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text15")}：</span>
                        <span>{Dao7RestBlocks}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/wallet-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text08")}：</span>
                        <span>{formatNum(balance)}</span>
                    </div>
                </div>
                <div className="drictorBut">
                    <button className="drictorExtract" onClick={ ()=> extract('7') } >{t("director.text11")}</button>
                    <button className="drictorLocking" onClick={
                            () => {
                                // console.log("isApprove =>",isApprove)
                                // console.log("pengingApprove =>",pengingApprove)
                                setAddFlagtype('7')
                                if (!isApprove7) {
                                    if (pengingApprove7) {
                                        toast('locked')
                                    }
                                    else  approveFn('7')
                                    return
                                }else{
                                    setAddFlag(true)
                                }
                            }}>{t("director.text12")}</button>
                </div>
            </div>
            {/* 15天 */}
            <div className="driectorBox">
                <img width="64px" height="64px" src={ require('../../assets/images/trs-icon-defalt-png.png') } alt="" />
                <p className="driectorBoxP1">{dao15name}</p>
                <p className="driectorBoxP2">APY 401.5%</p>
                {/* <p className="driectorBoxP2"></p> */}
                <div className="driectorBoxList">
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/lock-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text05")}：</span>
                        <span>{formatNum(dao15TotalSupply)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/mine-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text06")}：</span>
                        <span>{formatNum(dao15BalanceOf)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text07")}：</span>
                        <span>{formatNum(allAvailableAmount15)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text15")}：</span>
                        <span>{Dao15RestBlocks}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/wallet-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text08")}：</span>
                        <span>{formatNum(balance)}</span>
                    </div>
                </div>
                <div className="drictorBut">
                    <button className="drictorExtract" onClick={ ()=> extract('15') } >{t("director.text11")}</button>
                    <button className="drictorLocking" onClick={
                            () => {
                                setAddFlagtype('15')
                                console.log("isApprove15 =>",isApprove15)
                                console.log("pengingApprove15 =>",pengingApprove15)
                                if (!isApprove15) {
                                    if (pengingApprove15) {
                                        toast('locked')
                                    }
                                    else  approveFn('15')
                                    return
                                }else{
                                    setAddFlag(true)
                                }
                            }}>{t("director.text12")}</button>
                </div>
            </div>
            {/* 30天 */}
            <div className="driectorBox">
                <img width="64px" height="64px" src={ require('../../assets/images/trs-icon-defalt-png.png') } alt="" />
                <p className="driectorBoxP1">{daoname}</p>
                <p className="driectorBoxP2">APY 438%</p>
                {/* <p className="driectorBoxP2"></p> */}
                <div className="driectorBoxList">
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/lock-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text05")}：</span>
                        <span>{formatNum(daoTotalSupply)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/mine-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text06")}：</span>
                        <span>{formatNum(daoBalanceOf)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text07")}：</span>
                        <span>{formatNum(allAvailableAmount)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text15")}：</span>
                        <span>{DaoRestBlocks}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/wallet-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text08")}：</span>
                        <span>{formatNum(balance)}</span>
                    </div>
                </div>
                <div className="drictorBut">
                    <button className="drictorExtract" onClick={ ()=> extract('30') } >{t("director.text11")}</button>
                    <button className="drictorLocking" onClick={
                            () => {
                                console.log("isApprove =>",isApprove)
                                console.log("pengingApprove =>",pengingApprove)
                                setAddFlagtype('30')
                                if (!isApprove) {
                                    if (pengingApprove) {
                                        toast('locked')
                                    }
                                    else  approveFn('30')
                                    return
                                }else{
                                    setAddFlag(true)
                                }
                            }}>{t("director.text12")}</button>
                </div>
            </div>
            {/* 60天 */}
            <div className="driectorBox">
                <img width="64px" height="64px" src={ require('../../assets/images/trs-icon-defalt-png.png') } alt="" />
                <p className="driectorBoxP1">{daoname}</p>
                <p className="driectorBoxP2">APY 474.5%</p>
                {/* <p className="driectorBoxP2"></p> */}
                <div className="driectorBoxList">
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/lock-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text05")}：</span>
                        <span>{formatNum(daoTotalSupply)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/mine-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text06")}：</span>
                        <span>{formatNum(daoBalanceOf)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text07")}：</span>
                        <span>{formatNum(allAvailableAmount)}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/untie-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text15")}：</span>
                        <span>{DaoRestBlocks}</span>
                    </div>
                    <div className="driectorBoxItem">
                        <img src={ require('../../assets/images/wallet-icon-defalt-png.png') } alt="" />
                        <span className="driectorBoxItemSpan">{t("director.text08")}：</span>
                        <span>{formatNum(balance)}</span>
                    </div>
                </div>
                <div className="drictorBut">
                    <button className="drictorExtract" onClick={ ()=> extract('60') } >{t("director.text11")}</button>
                    <button className="drictorLocking" onClick={
                            () => {
                                setAddFlagtype('60')
                                if (!isApprove) {
                                    if (pengingApprove) {
                                        toast('locked')
                                    }
                                    else  approveFn('60')
                                    return
                                }else{
                                    setAddFlag(true)
                                }
                            }}>{t("director.text12")}</button>
                </div>
            </div>
            {//质押弹窗
                    addFlag && (
                        <div className="add-mask" onClick={
                            () => {
                                setAddFlag(false)
                            }
                        }>
                            <div className="add-mask-content" onClick={
                                (e) => {
                                    e.stopPropagation()
                                }
                            }>
                                <p className="mask-title">
                                    {t("director.text12")}</p>
                                <p className="mask-info">
                                    {/* {popType==='stake'?'':''} */}
                                    <span> {t("director.text16")}</span>
                                    <span className="num">
                                        {/* unStakedLp */}
                                        {stakedLp}
                                    </span>
                                </p>
                                <div className="mask-input-box">
                                    <input type="text" value={inputValue} onChange={
                                        (e) => {
                                            setInputVal(e.target.value)
                                        }
                                    } />
                                    <span onClick={
                                        () => {
                                                setInputVal(balance)
                                        }
                                    }>{t("provideLiquidity.text17")}</span>
                                </div>
                                <div className="mask-bottom">
                                    <div className="bottom-btn left-btn" onClick={
                                        () => {
                                            setAddFlag(false)
                                            setInputVal('0')
                                        }
                                    }>{t("provideLiquidity.text18")}</div>
                                    <div className="bottom-btn right-btn"
                                        onClick={
                                            () => {
                                                if(addFlagtype == '7'){
                                                    API.Dao7Deposit(inputValue).then(res => {
                                                        setAddFlag(false)
                                                    })
                                                }else if(addFlagtype == '30'){
                                                    API.DaoDeposit(inputValue).then(res => {
                                                        setAddFlag(false)
                                                    })
                                                }else if(addFlagtype == '15'){
                                                    API.Dao15Deposit(inputValue).then(res => {
                                                        setAddFlag(false)
                                                    })
                                                }
                                                
                                            }
                                        }
                                    >{t("provideLiquidity.text19")}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
        </>
    )
}