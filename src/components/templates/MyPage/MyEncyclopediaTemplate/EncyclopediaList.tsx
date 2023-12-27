import { TCollection, setCollections, setSelectCollection } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TResponseCollection } from '@api/types/collection';
import { IconEmptyBird } from '@assets/icons';
import { Images } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

export const EncyclopediaList = () => {
  const { collections } = useSelector((state: TRootState) => state.collectionStore);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const getEncyList = async () => {
    try {
      const res = await axiosFetch<any, TResponseCollection[]>({
        url: '/api/collection',
        method: 'get'
      });

      if (res.status === 200) {
        dispatch(setCollections(res.data));
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.message) });
      }
    }
  };

  const handleClick = (collection: TCollection | TResponseCollection) => () => {
    if (collection.characterId === null) {
      Alert.warning({ title: '아직 획득하지 못한 캐릭터입니다.' });
      return;
    }

    dispatch(setSelectCollection(collection as TResponseCollection));
    setIsOpen(true);
  };

  useEffect(() => {
    getEncyList();
  }, []);

  return (
    <Wrap>
      <Spacing height={30} />
      <StyledUl>
        {collections?.map((collection, index) => (
          <li key={index} onClick={handleClick(collection)}>
            {collection.characterId === null ? (
              <div className="wrap icon-wrap">
                <IconEmptyBird />
              </div>
            ) : (
              <div className="wrap image-wrap">
                <Images
                  imgUrl={collection.imageUrl}
                  imgAlt={collection.name}
                  imgWidth={65}
                  imgHeight={65}
                />
              </div>
            )}
            <Spacing height={10} />
            <span>{collection.name}</span>
          </li>
        ))}
        <PlanModalTemplate isOpen={isOpen} setIsOpen={setIsOpen} modalIndex={4} />
      </StyledUl>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 165px);
  padding: 0 13px;
`;

const StyledUl = styled.ul`
  width: 100%;
  flex: 1;
  max-height: calc(100vh - 195px);

  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow: auto;
  gap: 0 20px;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 96px;
    height: 150px;
    cursor: pointer;

    div.wrap {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 2px solid ${({ theme }) => theme.colors.darkGray};
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .icon-wrap {
      background-color: ${({ theme }) => theme.colors.subBlue};
    }

    .image-wrap {
      background-color: ${({ theme }) => theme.colors.basic};
    }

    span {
      display: inline-block;
      max-width: 60px;
      text-align: center;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;
