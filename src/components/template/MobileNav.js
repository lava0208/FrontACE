import React, { useState, Suspense } from "react";
import classNames from "classnames";
import { Drawer } from "components/ui";
import {
  NAV_MODE_THEMED,
  NAV_MODE_TRANSPARENT,
  DIR_RTL,
} from "constants/theme.constant";
import withHeaderItem from "utils/hoc/withHeaderItem";
import { NavToggle } from "components/shared";
import useResponsive from "utils/hooks/useResponsive";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { apiGetSalaries } from "services/SalariesServices";
import { setSalaryData } from "views/sales/SalesDashboard/store/dataSlice";
import { Button } from "components/ui";

const MobileNavToggle = withHeaderItem(NavToggle);

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const openDrawer = () => {
    setIsOpen(true);
  };

  const onDrawerClose = (e) => {
    setIsOpen(false);
  };

  const themeColor = useSelector((state) => state.theme.themeColor);
  const primaryColorLevel = useSelector(
    (state) => state.theme.primaryColorLevel
  );
  const [filter, SetFilter] = useState({});
  const navMode = useSelector((state) => state.theme.navMode);
  const mode = useSelector((state) => state.theme.mode);
  const direction = useSelector((state) => state.theme.direction);

  const { smaller } = useResponsive();

  const navColor = () => {
    if (navMode === NAV_MODE_THEMED) {
      return `bg-${themeColor}-${primaryColorLevel} side-nav-${navMode}`;
    }

    if (navMode === NAV_MODE_TRANSPARENT) {
      return `side-nav-${mode}`;
    }

    return `side-nav-${navMode}`;
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
      <label for="vehicle1" style={{ fontSize: 20 }}>
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
      <label for="vehicle2" style={{ fontSize: 20 }}>
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
      <label for="vehicle3" style={{ fontSize: 20 }}>
        {" "}
        Filter By Female
      </label>
      <br />
      <input
        type="radio"
        id="vehicle3"
        name="vehicle1"
        value="Boat"
        onChange={() => SetFilter({ order: "ASC", filter: "Male" })}
      />
      <label for="vehicle3" style={{ fontSize: 20 }}>
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
          onDrawerClose();
        }}
      >
        Apply Filter
      </Button>
    </div>
  );
  return (
    <>
      {smaller.md && (
        <>
          <div className="text-2xl" onClick={openDrawer}>
            <MobileNavToggle toggled={isOpen} />
          </div>
          <Drawer
            title="Navigation"
            isOpen={isOpen}
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
            bodyClass={classNames(navColor(), "p-0")}
            width={330}
            placement={direction === DIR_RTL ? "right" : "left"}
          >
            <Suspense fallback={<></>}>{isOpen && menuContent}</Suspense>
          </Drawer>
        </>
      )}
    </>
  );
};

export default MobileNav;
