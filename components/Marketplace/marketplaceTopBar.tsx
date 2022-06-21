import styles from "../../styles/Marketplace/marketplaceTopBar.module.scss";
import desoIcon from "../../public/deso/desologo.svg";
import ethIcon from "../../public/eth/ethlogo.svg";
import marketCardIcon from "../../public/icons/market_grid_type_card_icon.svg";
import marketGridIcon from "../../public/icons/market_grid_type_grid_icon.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../utils/Redux/hooks";
import { setDesoMarketplace, setETHMarketplaceNFTCategory, setETHMarketplaceStatus, setEthMarketplaceVerifiedCreators, setMarketplaceSortType, setMarketplaceViewTypeCard } from "../../utils/Redux/Slices/sortSlice";

const MarketplaceTopBar = ({ sortMarketplace }) => {
  // Redux
  const dispatch = useAppDispatch();
  let desoMarketplace = useAppSelector((state) => state.sort.desoMarketplace);
  let marketplaceSortType = useAppSelector((state) => state.sort.marketplaceSortType);
  let marketplaceViewTypeCard = useAppSelector((state) => state.sort.marketplaceViewTypeCard);

  const marketplaceSortTypeOptions = [
    { id: "most recent first", name: "Most recent first" },
    { id: "oldest first", name: "Oldest first" },
    { id: "highest price first", name: "Highest price first" },
    { id: "lowest price first", name: "Lowest price first" },
    { id: "most likes first", name: "Most likes first" },
    { id: "most diamonds first", name: "Most diamonds first" },
    { id: "most comments first", name: "Most comments first" },
    { id: "most reposts first", name: "Most reposts first" },
  ];

  const ethMarketplaceSortTypeOptions = [
    { id: "most recent first", name: "Most recent first" },
    { id: "oldest first", name: "Oldest first" },
    { id: "most likes first", name: "Most likes first" },
    { id: "most diamonds first", name: "Most diamonds first" },
    { id: "most comments first", name: "Most comments first" },
    { id: "most reposts first", name: "Most reposts first" },
  ];

  // Functions

  const updateEthMarketplaceStatus = () => {
    dispatch(setDesoMarketplace(false));

    dispatch(setETHMarketplaceStatus("all"));
    dispatch(setETHMarketplaceNFTCategory("all"))
    dispatch(setEthMarketplaceVerifiedCreators("verified"));
    dispatch(setMarketplaceSortType("most recent first"));

    // Put back
    // globalVars.getAllEthNFTs();
  }

  const updateDesoMarketplaceStatus = () => {
    dispatch(setDesoMarketplace(true));
  }

  const blockchainSelectChange = (desoMarket: string) => {
    if (desoMarket == "true" && !desoMarketplace) {
      updateDesoMarketplaceStatus();
    } else if (desoMarket == "false" && desoMarketplace) {
      updateEthMarketplaceStatus();
    }
  }

  const sortSelectChange = (event) => {
    if (marketplaceSortType != event) {
      if (!desoMarketplace) {
        sortSelectChangeEth(event);
      } else {
        dispatch(setMarketplaceSortType(event));
        sortMarketplace(0, false);
      }
    }
  }

  const sortSelectChangeEth = (event) => {
    if (marketplaceSortType != event) {
      dispatch(setMarketplaceSortType(event));

      if (
        marketplaceSortType === "highest price first" ||
        marketplaceSortType === "lowest price first"
      ) {
        // Put back
        // this.modalService.show(GeneralSuccessModalComponent, {
        //   class: "modal-dialog-centered nft_placebid_modal_bx  modal-lg",
        //   initialState: {
        //     header: "Error",
        //     text: "You cannot filter by price.",
        //     buttonText: "Ok",
        //     buttonClickedAction: "connectWalletMobileError",
        //   },
        // });
      } else {
        // Put back
        // this.globalVars.getEthNFTsByFilter();
      }
    }
    //     }
  }

  // Choosing between a grid display of NFTs and Card display
  const setDisplayType = (display: string) => {
    switch (display) {
      case "Card":
        dispatch(setMarketplaceViewTypeCard(true));
        break;
      case "Grid":
        dispatch(setMarketplaceViewTypeCard(false));
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.mrk_top}>
      <h2 style={{ color: "#222222" }} className={styles.mrkt_heading}>
        Marketplace
      </h2>
      <div className={styles.marketplace_top_selections_blockchain_selector}>
        <div
          className={
            styles.blockchain_selection_container + " " + styles.mrk_grid_one
          }
        >
          <button
            onClick={() => updateDesoMarketplaceStatus()}
            className={[
              styles.deso_marketplace_selector_container,
              desoMarketplace ? styles.marketplace_active : null,
            ].join(" ")}
          >
            <Image
              alt="deso icon"
              height={30}
              width={30}
              src={desoIcon}
              className={styles.deso_marketplace_logo}
            />
            <p className={styles.deso_marketplace_text}>Deso</p>
          </button>

          <button
            onClick={() => updateEthMarketplaceStatus()}
            className={[
              styles.eth_marketplace_selector_container,
              desoMarketplace ? null : styles.marketplace_active,
            ].join(" ")}
          >
            <Image
              alt="eth icon"
              height={30}
              width={30}
              src={ethIcon}
              className={styles.eth_marketplace_logo}
            />
            <p className={styles.eth_marketplace_text}>Eth</p>
          </button>
        </div>
      </div>
      <div className={styles.marketplace_top_selections}>
        <div
          className={
            styles.blockchain_select_container + " " + styles.mrk_grid_one
          }
        >
          <label>Blockchain</label>
          <select
            value={desoMarketplace}
            onChange={(e) => blockchainSelectChange(e)}
            className={styles.blockchain_select}
          >
            <option value="true">Deso</option>
            <option value="false">Ethereum</option>
          </select>
        </div>
        {desoMarketplace ? (
          <div className={styles.mrk_top_selector_two}>
            <button
              onClick={() => setDisplayType("Card")}
              className={[
                "selected",
                marketplaceViewTypeCard ? styles.selected : "",
              ].join(" ")}
            >
              <Image width={20} src={marketCardIcon} alt="card icon" />
            </button>
            <button
              onClick={() => setDisplayType("Grid")}
              className={!marketplaceViewTypeCard ? styles.selected : ""}
            >
              <Image width={20} src={marketGridIcon} alt="grid icon" />
            </button>
          </div>
        ) : (
          <div className={styles.mrk_top_selector_two}>
            <button
              onClick={() => setDisplayType("Card")}
              className={[marketplaceViewTypeCard ? styles.selected : ""].join(
                " "
              )}
            >
              <img src={marketCardIcon} alt="card icon" />
            </button>
            <button
              onClick={() => setDisplayType("Grid")}
              className={!marketplaceViewTypeCard ? styles.selected : ""}
            >
              <img src={marketGridIcon} alt="grid icon" />
            </button>
          </div>
        )}

        {desoMarketplace ? (
          <div className={styles.mrk_grid_three}>
            <label>Sort by</label>

            <select
              value={marketplaceSortType}
              onChange={(e) => sortSelectChange(e)}
              className={styles.mrk_select + " " + styles.mrk_top_select_height}
            >
              {marketplaceSortTypeOptions.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={styles.mrk_grid_three}>
            <label>Sort by</label>
            <select
              value={marketplaceSortType}
              onChange={(e) => sortSelectChange(e)}
              className={styles.mrk_select + " " + styles.mrk_top_select_height}
            >
              {ethMarketplaceSortTypeOptions.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceTopBar;
