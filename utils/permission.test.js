import { expect, test, describe } from 'vitest';
import {
  hasPermission,
  getPermissionType,
  getPermissionLabel,
  removePermission,
  addPermission,
  identity,
  Permissions,
} from './permission';

describe('permission', () => {
  test('hasPermission', () => {
    expect(hasPermission(identity.GUEST, Permissions.READ)).toBe(true);
    expect(hasPermission(identity.USER, Permissions.DOWNLOAD)).toBe(true);
    expect(hasPermission(identity.EDITOR, Permissions.UPLOAD)).toBe(true);
    expect(hasPermission(identity.MANAGER, Permissions.DELETE)).toBe(true);
  });

  test('getPermissionType', () => {
    expect(getPermissionType(Permissions.READ)).toBe('GUEST');
    expect(getPermissionType(Permissions.USER)).toBe('USER');
    expect(getPermissionType(Permissions.EDITOR)).toBe('EDITOR');
    expect(getPermissionType(Permissions.MANAGER)).toBe('MANAGER');
  });

  test('getPermissionLabel', () => {
    expect(getPermissionLabel(Permissions.READ)).toBe('仅可查看');
    expect(getPermissionLabel(Permissions.USER)).toBe('可查看/下载');
    expect(getPermissionLabel(Permissions.EDITOR)).toBe('可编辑');
    expect(getPermissionLabel(Permissions.MANAGER)).toBe('可管理');
  });

  test('removePermission', () => {
    expect(removePermission(identity.EDITOR, Permissions.DOWNLOAD)).toBe(27);
    expect(removePermission(identity.MANAGER, Permissions.MOVE)).toBe(191);
  });

  test('addPermission', () => {
    expect(addPermission(identity.EDITOR, Permissions.DOWNLOAD)).toBe(31);
    expect(addPermission(identity.MANAGER, Permissions.CREATELINK)).toBe(255);
  });
});

