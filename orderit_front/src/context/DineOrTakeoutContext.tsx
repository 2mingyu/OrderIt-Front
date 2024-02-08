import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DineOrTakeoutContextType {
  dineOrTakeout: string | null; // 'Dine', 'Takeout', 또는 null
  setDineOrTakeout: (value: string | null) => void; // 식사 옵션을 설정하는 함수
}

// 초기 상태 정의
const initialState: DineOrTakeoutContextType = {
  dineOrTakeout: null, // 초기 식사 옵션은 선택되지 않음
  setDineOrTakeout: () => {}, // 초기 set 함수는 빈 함수
};

// Context 생성
const DineOrTakeoutContext = createContext<DineOrTakeoutContextType>(initialState);

// Provider 컴포넌트 정의
export const DineOrTakeoutProvider = ({ children }: { children: ReactNode }) => {
  const [dineOrTakeout, setDineOrTakeout] = useState<string | null>(initialState.dineOrTakeout);

  return (
    <DineOrTakeoutContext.Provider value={{ dineOrTakeout, setDineOrTakeout }}>
      {children}
    </DineOrTakeoutContext.Provider>
  );
};

// Custom Hook
export const useDineOrTakeout = () => useContext(DineOrTakeoutContext);
