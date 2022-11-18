import React, { useState } from "react";
import classNames from "classnames";
import { Button, ScrollBar } from "components/ui";
import PropTypes from "prop-types";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_MODE_DARK,
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  SIDE_NAV_CONTENT_GUTTER,
  LOGO_X_GUTTER,
} from "constants/theme.constant";
import Logo from "components/template/Logo";
import useResponsive from "utils/hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { setSalaryData } from "views/sales/SalesDashboard/store/dataSlice";
import { apiGetSalaries } from "services/SalariesServices";

const sideNavStyle = {
  width: SIDE_NAV_WIDTH,
  minWidth: SIDE_NAV_WIDTH,
};

const sideNavCollapseStyle = {
  width: SIDE_NAV_COLLAPSED_WIDTH,
  minWidth: SIDE_NAV_COLLAPSED_WIDTH,
};

const SideNav = () => {
  const themeColor = useSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state.theme.primaryColorLevel
  );
  const [filter, SetFilter] = useState({});
  const navMode = useSelector((state) => state.theme.navMode);
  const mode = useSelector((state) => state.theme.mode);
  const direction = useSelector((state) => state.theme.direction);

  const dispatch = useDispatch();
  const sideNavCollapse = useSelector(
    (state) => state.theme.layout.sideNavCollapse
  );

  const { larger } = useResponsive();

  const sideNavColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
    }
    return `side-nav-${navMode}`;
  };

  const logoMode = () => {
    if (navMode === NAV_MODE_THEMED) {
      return NAV_MODE_DARK;
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode;
    }

    return navMode;
  };

  const menuContent = (
    <div style={{ padding: 20 }}>
      <input
        type="radio"
        id="vehicle1"
        name="vehicle1"
        value="Bike"
        defaultChecked={true}
        onChange={() => SetFilter({ order: "ASC" })}
      />
      <label htmlFor="vehicle1" style={{ fontSize: 20 }}>
        {" "}
        A to Z
      </label>
      <br />
      <input
        type="radio"
        id="vehicle2"
        name="vehicle1"
        value="Car"
        onChange={() => SetFilter({ order: "DESC" })}
      />
      <label htmlFor="vehicle2" style={{ fontSize: 20 }}>
        {" "}
        Z to A
      </label>
      <br />
      <input
        type="radio"
        id="vehicle3"
        name="vehicle1"
        value="Boat"
        onChange={() => SetFilter({ order: "ASC", filter: "Female" })}
      />
      <label htmlFor="vehicle3" style={{ fontSize: 20 }}>
        {" "}
        Filter By Female
      </label>
      <br />
      <input
        type="radio"
        id="vehicle4"
        name="vehicle1"
        value="Boat"
        onChange={() => SetFilter({ order: "ASC", filter: "Male" })}
      />
      <label htmlFor="vehicle4" style={{ fontSize: 20 }}>
        {" "}
        Filter By Male
      </label>
      <br />
      <br />
      <Button
        variant="solid"
        onClick={async () => {
          const responde = await apiGetSalaries(filter);
          dispatch(setSalaryData(responde?.data?.data));
        }}
      >
        Apply Filter
      </Button>
    </div>
  );

  return (
    <>
      {larger.md && (
        <div
          style={sideNavCollapse ? sideNavCollapseStyle : sideNavStyle}
          className={classNames(
            "side-nav",
            sideNavColor(),
            !sideNavCollapse && "side-nav-expand"
          )}
        >
          <div className="side-nav-header">
            <Logo
              mode={logoMode()}
              type={sideNavCollapse ? "streamline" : "full"}
              gutter={sideNavCollapse ? SIDE_NAV_CONTENT_GUTTER : LOGO_X_GUTTER}
            />
          </div>
          {sideNavCollapse ? (
            ""
          ) : (
            <div className="side-nav-content">
              <ScrollBar autoHide direction={direction}>
                <>{menuContent}</>
              </ScrollBar>
            </div>
          )}
        </div>
      )}
    </>
  );
};

SideNav.propTypes = {
  themed: PropTypes.bool,
  darkMode: PropTypes.bool,
  themeColor: PropTypes.string,
};

SideNav.defaultProps = {
  themed: false,
  darkMode: false,
  themeColor: "",
};

export default SideNav;
