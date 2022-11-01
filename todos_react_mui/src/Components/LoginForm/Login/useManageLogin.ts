import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectLoginSection, setCurrentSection } from '../../../store/slices/loginSlice';
import { SIGN_IN, SIGN_UP } from '../../../constants/values';

export const useManageLogin = ({ useDispatch, useSelector }: any) => {
  const dispatch = useDispatch();
  const currentSection: string = useSelector(selectLoginSection);

  const handleNavigation = () => {
    currentSection === SIGN_IN
      ? dispatch(setCurrentSection({ section: SIGN_UP }))
      : dispatch(setCurrentSection({ section: SIGN_IN }));
  };

  return { currentSection, handleNavigation };
};
