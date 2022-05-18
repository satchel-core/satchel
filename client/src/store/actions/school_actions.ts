import Web3 from 'web3';
import axios from 'axios';

import * as types from './types';
import contractAbi from '../../contracts/Satchel.sol/Satchel.json';
import assets from '../../utils/assets.json';
import erc20Abi from '../../contracts/erc20Abi.json';
import schoolAbi from '../../contracts/School.sol/School.json';
import { connectWallet } from './helpers';
import { AbiItem } from 'web3-utils';
import { useDispatch } from 'react-redux';
import { NextRouter, useRouter } from 'next/router';
import { getKeys, handleCustomUrl } from '../../utils/common';
import { Dispatch } from 'react';
