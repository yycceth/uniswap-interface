import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { BookOpen, Code, Info, MessageCircle, PieChart } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
// import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
// import { ButtonPrimary } from '../Button'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
position: absolute;
top:0;
right: 0;
left:0;
z-index: 100;
  background-color: #FFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
 
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`
const MuneBox = styled.div`
position: fixed;
background-color: rgba(255,255,255,.6);
top: 3.8rem;
left: 0;
right: 0;
bottom: 0;
}
`
const NavLinkItem = styled(NavLink)`
padding: 0.5rem 0.5rem;
text-decoration:none;
color: ${({ theme }) => theme.text2};
`

const CODE_LINK = 'https://github.com/Uniswap/uniswap-interface'
export default function Menu() {
  // const { account } = useActiveWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  // const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {/* open &&  */}
      {open && (
        <MuneBox onClick={toggle}>
          <MenuFlyout>
            <NavLinkItem id={`swap-nav-link`} to={'/swap'}>兑换</NavLinkItem>
            <NavLinkItem id={`mining-nav-link`} to={'/mining'}>流动性挖矿</NavLinkItem>
            <MenuItem id="link" href="https://uniswap.org/">
              <Info size={14} />
            About
           </MenuItem>
            <MenuItem id="link" href="https://uniswap.org/docs/v2">
              <BookOpen size={14} />
            Doc
            </MenuItem>
            <MenuItem id="link" href={CODE_LINK}>
              <Code size={14} />
            Code
          </MenuItem>
            <MenuItem id="link" href="https://discord.gg/FCfyBSbCU5">
              <MessageCircle size={14} />
            Discord
          </MenuItem>
            <MenuItem id="link" href="https://uniswap.info/">
              <PieChart size={14} />
            Analytics
          </MenuItem>
            {/* {account && (
              <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderRadius="12px" mt="0.5rem">
                Claim UNI
              </ButtonPrimary>
            )} */}
          </MenuFlyout>
        </MuneBox>
      )}
    </StyledMenu>
  )
}
